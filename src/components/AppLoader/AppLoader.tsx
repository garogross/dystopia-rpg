import React from "react";

import TransitionProvider, {
  TransitionStyleTypes,
} from "../../providers/TransitionProvider";

import styles from "./AppLoader.module.scss";

interface Props {
  loading: boolean;
  isTransparent?: boolean;
}

const AppLoader: React.FC<Props> = ({ loading, isTransparent }) => {
  return (
    <TransitionProvider
      className={`${styles.appLoader} ${
        isTransparent ? styles.appLoader_transparent : ""
      }`}
      style={TransitionStyleTypes.opacityLeave}
      inProp={loading}
    >
      <div className={styles.appLoader__lottieWrapper}>
        {/* <Lottie
          animationData={loadingLottie}
          loop={true}
          className={styles.appLoader__lottie}
        ></Lottie> */}
      </div>
    </TransitionProvider>
  );
};

export default AppLoader;
