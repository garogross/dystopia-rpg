import React from "react";

import styles from "./LoadingOverlay.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";

interface Props {
  loading: boolean;
  withoutTransition?: boolean;
  text?: string;
}

const LoadingOverlay: React.FC<Props> = ({
  loading,
  withoutTransition,
  text,
}) => {
  return (
    <>
      {withoutTransition ? (
        <>
          {loading && (
            <div className={styles.loadingOverlay}>
              <span>Loading...</span>
            </div>
          )}
        </>
      ) : (
        <TransitionProvider
          inProp={!!loading}
          style={TransitionStyleTypes.opacity}
          className={styles.loadingOverlay}
        >
          <span>{text || "Loading..."}</span>
        </TransitionProvider>
      )}
    </>
  );
};

export default LoadingOverlay;
