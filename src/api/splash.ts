import { ESplashTypes } from "../constants/ESplashTypes";

export const PUZZLE_MEDIA_BASE_PATH = "https://idledystopia.com/puzzle-media";
export const DYSTOPIA_GAME_MEDIA_BASE_PATH = "https://dystopia.game/media";
// https://dystopia.game/media/random-splash?type=cyberfarm
export const randomSplashPath = "/random-splash";

export const fecthRandomSplashImage = async (type?: ESplashTypes) => {
  const path =
    DYSTOPIA_GAME_MEDIA_BASE_PATH + randomSplashPath + `?type=${type}`;
  const res = await fetch(path);
  const data = await res.json();

  return data;
};
