import React, { ReactNode } from "react";

import styles from "./ModalWithAdd.module.scss";
import Backdrop from "../Backdrop/Backdrop";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import WrapperWithFrame from "../WrapperWithFrame/WrapperWithFrame";
import NewPortalProvider from "../../../providers/NewPortalProvider";
import HeaderBtn from "../HeaderBtn/HeaderBtn";

interface Props {
  show: boolean;
  onClose: () => void;
  title?: string;
  titleLg?: string;
  withoutFrame?: boolean;
  children: ReactNode;
  fullHeught?: boolean
}

const ModalWithAdd: React.FC<Props> = ({
  onClose,
  show,
  title,
  children,
  titleLg,
  withoutFrame,
  fullHeught
}) => {
  const content = (
    <>
      <HeaderBtn
        type={"close"}
        className={styles.modalWithAdd__closeBtn}
        onClick={onClose}
      />
      {titleLg && (
        <h2 className={styles.modalWithAdd__titleLgText}>{titleLg}</h2>
      )}
      {title && <h4 className={styles.modalWithAdd__titleText}>{title}</h4>}{" "}
      <div className={styles.modalWithAdd__content}>{children}</div>
      <div className={styles.modalWithAdd__adWrapper}></div>
    </>
  );
  return (
    <>
      <Backdrop inProp={show} onClose={onClose} />
      <NewPortalProvider>
        <TransitionProvider
          inProp={show}
          style={TransitionStyleTypes.opacity}
          className={`${styles.modalWithAdd} ${fullHeught ? styles.modalWithAdd_full : ""}`}
        >
          {!withoutFrame ? (
            <WrapperWithFrame
              size="lg"
              className={styles.modalWithAdd__container}
              innerClassName={styles.modalWithAdd__wrapper}
            >
              {content}
            </WrapperWithFrame>
          ) : (
            <div className={styles.modalWithAdd__wrapper}>{content}</div>
          )}
        </TransitionProvider>
      </NewPortalProvider>
    </>
  );
};

export default ModalWithAdd;
