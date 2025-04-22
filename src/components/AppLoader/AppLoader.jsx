
import { useEffect, useRef, useState } from "react";
import styles from "./AppLoader.module.scss";

import { fecthRandomSplashImage,PUZZLE_MEDIA_BASE_PATH } from "../../api/splash";
import TransitionProvider, { TransitionStyleTypes } from "../../providers/TransitionProvider";

const AppLoader = ({ loading }) => {
  const [image, setImage] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);
  const videoRef = useRef(null);

  const isImage = image && /\.(jpg|jpeg|png|gif|webp)$/i.test(image);
  const isVideo = image && /\.(mp4|webm|ogg)$/i.test(image);

  const fullSplashUrl = `${PUZZLE_MEDIA_BASE_PATH}/splash/${image}`;
console.log({imageLoaded});

  useEffect(() => {
    if (imageLoaded) {
      setTimeout(() => {
        setTimerFinished(true);
      }, 3000);
    }
  }, [imageLoaded]);

  useEffect(() => {
    if (image) {
      setTimeout(() => {
        setImageLoaded(true);
      }, 6000);

      if (videoRef.current) videoRef.current.play();
    }
  }, [image]);

  useEffect(() => {
    (async () => {
      try {
        const { image } = await fecthRandomSplashImage();
        setImage(image);
      } catch (error) {}
    })();
  
  }, []);

  return (
    <TransitionProvider
      style={TransitionStyleTypes.opacity}
      inProp={
        (loading || !timerFinished)
      }
      className={styles.appLoader}
    >
      <div
        className={`${styles.appLoader__loader} ${image && imageLoaded ? styles.appLoader__loader_hidden : ""}`}
      ></div>
      {image && (
        <>
          {isImage && (
            <img
              onLoad={() => setImageLoaded(true)}
              src={fullSplashUrl}
              alt="loader"
              className={`${styles.appLoader__img} container ${
                !imageLoaded ? "hidden" : ""
              }`}
            />
          )}
          {isVideo && (
            <video
              ref={videoRef}
              onCanPlayThrough={() => setImageLoaded(true)}
              autoPlay={true}
              loop={true}
              controls={false}
              playsInline
              muted={true}
              src={fullSplashUrl}
              alt="loader"
              className={`${styles.appLoader__img} container `}
            />
          )}
        </>
      )}
 
    </TransitionProvider>
  );
};

export default AppLoader;
