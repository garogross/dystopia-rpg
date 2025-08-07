import { useEffect, useState } from "react";
import { useAppSelector } from "./redux";
import { ELSProps } from "../constants/ELSProps";
import { getLSItem } from "../helpers/localStorage";

export const useSocket = (
  endpoint: string,
  onMessage: <T extends any>(data: T) => void,
  deps: any[] = []
) => {
  const storeToken = useAppSelector((state) => state.profile.token);
  const [token, setToken] = useState(storeToken);

  useEffect(() => {
    (async () => {
      const token = await getLSItem(ELSProps.token);
      if (token) setToken(token);
    })();
  });

  useEffect(() => {
    if (token && deps.every((item) => item)) {
      const wsUrl = `${process.env.REACT_APP_SOCKET_URL}${endpoint}?token=${token}`;
      console.log({ wsUrl });

      const socket = new WebSocket(wsUrl);

      socket.onopen = function () {
        console.info("WebSocket соединение установлено");
      };

      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        onMessage(data);
      };

      socket.onerror = function (error) {
        console.error("WebSocket ошибка:", error);
      };

      socket.onclose = function (event) {
        console.info("Соединение прервано");
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, ...deps]);
};
