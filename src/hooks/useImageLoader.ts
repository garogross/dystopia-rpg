import * as allImages from "../assets/images";
import { useEffect, useState } from "react";
import { preloadImages } from "../helpers/preloadImages";

export const useImageLoader = () => {
  const [loading, setLoading] = useState(false);

  const imagesArr = Object.values(allImages)
  // .filter((item) =>
  //   item.endsWith(".webp")
  // );
  // ONLY FOR DEV

  useEffect(() => {
    setLoading(true);
    preloadImages(imagesArr)
      .then(() => {})
      .catch((err) => {
        console.error("Failed to load images", err);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading;
};
