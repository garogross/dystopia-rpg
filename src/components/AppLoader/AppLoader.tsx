import { useEffect, useRef, useState } from "react";
import styles from "./AppLoader.module.scss";

import {
  fecthRandomSplashImage,
  PUZZLE_MEDIA_BASE_PATH,
} from "../../api/splash";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../providers/TransitionProvider";

interface Props {
  loading: boolean;
  timerFinished: boolean;
  setTimerFinished: (timerFinished: boolean) => void;
}

const AppLoader = ({ loading, timerFinished, setTimerFinished }: Props) => {
  const [image, setImage] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isImage = image && /\.(jpg|jpeg|png|gif|webp)$/i.test(image);
  const isVideo = image && /\.(mp4|webm|ogg)$/i.test(image);

  const fullSplashUrl = `${PUZZLE_MEDIA_BASE_PATH}/splash/${image}`;

  useEffect(() => {
    if (imageLoaded) {
      setTimeout(() => {
        setTimerFinished(true);
      }, 3000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      inProp={loading || !timerFinished}
      className={styles.appLoader}
    >
      <div
        className={`${styles.appLoader__loader} ${
          image && imageLoaded ? styles.appLoader__loader_hidden : ""
        }`}
      ></div>
      {image && (
        <>
          {isImage && (
            <img
              onLoad={() => setImageLoaded(true)}
              src={fullSplashUrl}
              alt="loader"
              className={`${styles.appLoader__img} gameContainer ${
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
              className={`${styles.appLoader__img} gameContainer `}
            />
          )}
        </>
      )}
    </TransitionProvider>
  );
};

export default AppLoader;
