import React, { createContext, useContext, useEffect, useState } from "react";
import { TaddyWeb } from "taddy-sdk-web";

interface TaddyContextType {
  exchange: ReturnType<typeof taddy.exchange> | null;
  taddyTasks: any[];
  fetchTaddyTasks: () => void;
}

const TaddyContext = createContext<TaddyContextType>({
  exchange: null,
  taddyTasks: [],
  fetchTaddyTasks: () => {},
});

const taddyPublicId = process.env.REACT_APP_TADDY_PUBLIC_ID as string;
const taddy = new TaddyWeb(taddyPublicId);

export const TaddyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [exchange, setExchange] = useState<ReturnType<
    typeof taddy.exchange
  > | null>(null);
  const [taddyTasks, setTaddyTasks] = useState<any[]>([]);

  useEffect(() => {
    taddy.ready();
    const exchangeInstance = taddy.exchange();
    setExchange(exchangeInstance);
  }, []);

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

  return (
    <TaddyContext.Provider value={{ exchange, taddyTasks, fetchTaddyTasks }}>
      {children}
    </TaddyContext.Provider>
  );
};

export const useTaddy = () => useContext(TaddyContext);
