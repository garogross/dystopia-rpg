import { useEffect, useState } from "react";
import { useAppSelector } from "./redux";
import { ELSProps } from "../constants/ELSProps";
import { getLSItem } from "../helpers/localStorage";
import { postLog } from "../api/logs";

export const useSocket = (
  endpoint: string,
  onMessage: <T extends any>(data: T) => void,
  deps: any[] = []
) => {
  const storeToken = useAppSelector((state) => state.profile.token);
  const tgId = useAppSelector((state) => state.profile.tgId);
  const [token, setToken] = useState(storeToken);

  useEffect(() => {
    (async () => {
      const token = await getLSItem(ELSProps.token);
      if (token) setToken(token);
    })();
  });

  useEffect(() => {
    if (token && deps.every((item) => item)) {
      let socket: WebSocket | null = null;
      let reconnectTimeout: NodeJS.Timeout | null = null;
      let shouldReconnect = true;
      const RECONNECT_DELAY = 3000; // ms

      const connect = () => {
        const wsUrl = `${process.env.REACT_APP_SOCKET_URL}${endpoint}?token=${token}`;
        socket = new WebSocket(wsUrl);

        socket.onopen = function () {
          console.info("WebSocket соединение установлено");
        };

        socket.onmessage = function (event) {
          const data = JSON.parse(event.data);
          onMessage(data);
        };

        socket.onerror = function (error) {
          console.error("WebSocket ошибка:", error);
          postLog({ tgId, type: "socket connect error", error: error });

          // Try to reconnect if needed
          if (shouldReconnect && !reconnectTimeout) {
            reconnectTimeout = setTimeout(() => {
              reconnectTimeout = null;
              connect();
            }, RECONNECT_DELAY);
          }
        };

        socket.onclose = function (event) {
          console.info("Соединение прервано");
          postLog({ tgId, type: "socket connect close", error: event });
          // Try to reconnect if needed
          if (shouldReconnect && !reconnectTimeout) {
            reconnectTimeout = setTimeout(() => {
              reconnectTimeout = null;
              connect();
            }, RECONNECT_DELAY);
          }
        };
      };

      connect();

      return () => {
        shouldReconnect = false;
        if (reconnectTimeout) {
          clearTimeout(reconnectTimeout);
        }
        if (socket) {
          socket.close();
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, ...deps]);
};
