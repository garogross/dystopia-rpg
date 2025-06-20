import React, { useEffect, useState, useRef } from "react";

import styles from "./RPGGamePlayAreaLoader.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import {
  elipse1Image,
  elipse2Image,
  elipse3Image,
  elipse4Image,
} from "../../../../assets/imageMaps";

interface Props {
  loading: boolean;
}

const RPGGamePlayAreaLoader: React.FC<Props> = ({ loading }) => {
  const [gatesClosed, setGatesClosed] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [loaderInited, setLoaderInited] = useState(true);

  useEffect(() => {
    if (loading) {
      setLoaderInited(false);
      setProgress(0);
      // Animate progress from 0 to 90
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) {
            return prev + 1;
          } else {
            clearInterval(intervalRef.current!);
            return 90;
          }
        });
      }, 15);
      setTimeout(() => {
        setGatesClosed(true);
      }, 300);
    } else {
      // Animate progress from 90 to 100
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) {
            return prev + 1;
          } else {
            clearInterval(intervalRef.current!);
            return 100;
          }
        });
      }, 30);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [loading]);

  useEffect(() => {
    if (progress === 90) {
      setLoaderInited(true);
    }
  }, [progress]);

  useEffect(() => {
    if (loaderInited && !loading) {
      setGatesClosed(false);
    }
  }, [loaderInited, loading]);

  // Linear gradient for progress
  const circleMainStyle = {
    background: `linear-gradient(0deg, #332053 ${progress}%, #0F0E10 ${progress}%)`,
  };

  return (
    <TransitionProvider
      style={TransitionStyleTypes.opacityLeave}
      inProp={loading || !loaderInited}
      className={styles.rpgGamePlayAreaLoader}
    >
      <div
        className={`${styles.rpgGamePlayAreaLoader__gateImg} ${
          styles.rpgGamePlayAreaLoader__gateImg_reversed
        } ${gatesClosed ? styles.rpgGamePlayAreaLoader__gateImg_closed : ""}`}
      />
      <div
        className={`${styles.rpgGamePlayAreaLoader__gateImg} ${
          gatesClosed ? styles.rpgGamePlayAreaLoader__gateImg_closed : ""
        }`}
      />
      <div className={styles.rpgGamePlayAreaLoader__circle}>
        <div
          className={styles.rpgGamePlayAreaLoader__circleMain}
          style={circleMainStyle}
        >
          <img
            src={elipse1Image}
            alt="elipse"
            className={styles.rpgGamePlayAreaLoader__circle1Img}
          />
          <img
            src={elipse2Image}
            alt="elipse"
            className={styles.rpgGamePlayAreaLoader__circle2Img}
          />
          <img
            src={elipse3Image}
            alt="elipse"
            className={styles.rpgGamePlayAreaLoader__circle3Img}
          />
          <img
            src={elipse4Image}
            alt="elipse"
            className={styles.rpgGamePlayAreaLoader__circle4Img}
          />
          <h3 className={styles.rpgGamePlayAreaLoader__circleText}>{progress}%</h3>
        </div>
      </div>
    </TransitionProvider>
  );
};

export default RPGGamePlayAreaLoader;
