import { useEffect } from "react";
import { useAppSelector } from "./redux";

export const useSocket = (
  endpoint: string,
  onMessage: <T extends any>(data: T) => void,
  deps: any[] = []
) => {
  const token = useAppSelector((state) => state.profile.token);
  useEffect(() => {
    if (token && deps.every((item) => item)) {
      const wsUrl = `${process.env.REACT_APP_SOCKET_URL}${endpoint}?token=${token}`;

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
