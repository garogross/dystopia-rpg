import React, { createContext, useContext, useEffect, useState } from "react";
import { FeedItem } from "taddy-sdk-web";
import { useTelegram } from "../hooks/useTelegram";
import { useAppSelector } from "../hooks/redux";

interface TaddyContextType {
  exchange: ReturnType<typeof window.Taddy.exchange> | null;
  taddyTasks: any[];
  fetchTaddyTasks: () => void;
  removeTaddyTask: (id: FeedItem["id"]) => void;
}

const TaddyContext = createContext<TaddyContextType>({
  exchange: null,
  taddyTasks: [],
  fetchTaddyTasks: () => {},
  removeTaddyTask: (id: FeedItem["id"]) => {},
});

const taddyPublicId = process.env.REACT_APP_TADDY_PUBLIC_ID as string;

export const TaddyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  const taddy = window.Taddy;
  const [exchange, setExchange] = useState<ReturnType<
    typeof taddy.exchange
  > | null>(null);
  const tg = useTelegram();
  const [taddyTasks, setTaddyTasks] = useState<any[]>([]);

  useEffect(() => {
    if (!tg.initDataUnsafe.user?.id || !gameInited || !taddy) return;
    taddy?.init(taddyPublicId, { debug: true });

    taddy?.ready();
    const exchangeInstance = taddy.exchange();
    setExchange(exchangeInstance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameInited]);

  const fetchTaddyTasks = () => {
    if (!exchange) return;
    exchange
      .feed({
        limit: 8,
        imageFormat: "png",
        autoImpressions: true,
      })
      .then((fetchedTaddyTasks) => {
        setTaddyTasks(fetchedTaddyTasks);
      })
      .catch((err) => console.error({ err }));
  };

  const removeTaddyTask = (id: FeedItem["id"]) => {
    setTaddyTasks((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <TaddyContext.Provider
      value={{ exchange, taddyTasks, fetchTaddyTasks, removeTaddyTask }}
    >
      {children}
    </TaddyContext.Provider>
  );
};

export const useTaddy = () => useContext(TaddyContext);
