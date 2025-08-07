import React from "react";

import styles from "./LoadingOverlay.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";

interface Props {
  loading: boolean;
  withoutTransition?: boolean;
}

const LoadingOverlay: React.FC<Props> = ({ loading, withoutTransition }) => {
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
          <span>Loading...</span>
        </TransitionProvider>
      )}
    </>
  );
};

export default LoadingOverlay;
