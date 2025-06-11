import React from "react";

import styles from "./LoadingOverlay.module.scss";
import TransitionProvider, { TransitionStyleTypes } from "../../../providers/TransitionProvider";

interface Props {
    loading: boolean
}

const LoadingOverlay: React.FC<Props> = ({loading}) => {
  return (
    <TransitionProvider
      inProp={!!loading}
      style={TransitionStyleTypes.opacity}
      className={styles.loadingOverlay}
    >
      <span>Loading...</span>
    </TransitionProvider>
  );
};

export default LoadingOverlay;
