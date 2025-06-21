export const getPlatformType = () => {
  const tg = window.Telegram.WebApp;
  const isMobile =
    tg?.platform &&
    !["macos", "tdesktop", "weba", "web", "webk"].includes(tg?.platform);

  return isMobile;
};
