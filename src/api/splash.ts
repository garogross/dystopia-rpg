export const PUZZLE_MEDIA_BASE_PATH = "https://idledystopia.com/puzzle-media";
const randomSplashPath = "/random-splash";


export const fecthRandomSplashImage = async () => {
    const res = await fetch(`${PUZZLE_MEDIA_BASE_PATH}${randomSplashPath}`);
    const data = await res.json();
  
    return data;
  };