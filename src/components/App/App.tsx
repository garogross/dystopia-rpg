import { useEffect } from "react";
import AppRouter from "../../router/AppRouter";
import eruda from "eruda";

export const App = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
    }
    eruda.init();
  }, []);
  return (
    <>
      <AppRouter />
    </>
  );
};
