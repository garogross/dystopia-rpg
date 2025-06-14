export const initOnClicka = (id: string) => {
  const handlerGo = () => {
    window.onclickaMini?.goId(id);
  };

  if (window.onclickaMini?.isInit) {
    handlerGo();
  } else {
    document.addEventListener("onclickaMini", handlerGo);
    return () => document.removeEventListener("onclickaMini", handlerGo);
  }
};
