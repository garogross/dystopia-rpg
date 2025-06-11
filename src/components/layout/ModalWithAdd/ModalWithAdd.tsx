import React, { ReactNode } from "react";

import styles from "./ModalWithAdd.module.scss";
import Backdrop from "../Backdrop/Backdrop";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import WrapperWithFrame from "../WrapperWithFrame/WrapperWithFrame";
import NewPortalProvider from "../../../providers/NewPortalProvider";
import HeaderBtn from "../HeaderBtn/HeaderBtn";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../hooks/redux";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";

const { somethingWentWrong } = TRANSLATIONS.errors;
interface Props {
  show: boolean;
  onClose: () => void;
  title?: string;
  titleLg?: string;
  withoutFrame?: boolean;
  children: ReactNode;
  fullHeught?: boolean;
  loading?: boolean;
  errored?: boolean;
  errorText?: string;
}

const ModalWithAdd: React.FC<Props> = ({
  onClose,
  show,
  title,
  children,
  titleLg,
  withoutFrame,
  fullHeught,
  loading,
  errored,
  errorText
}) => {
  const language = useAppSelector((state) => state.ui.language);
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
      <TransitionProvider
        inProp={!!errored}
        style={TransitionStyleTypes.height}
        height={30}
        className={styles.modalWithAdd__error}
      >
        <span>{errorText || somethingWentWrong[language]}</span>
      </TransitionProvider>
      <div className={styles.modalWithAdd__adWrapper}></div>
    </>
  );
  return (
    <>
      <Backdrop inProp={show} onClose={loading ? () => {} : onClose} />
      <NewPortalProvider>
        <TransitionProvider
          inProp={show}
          style={TransitionStyleTypes.opacity}
          className={`${styles.modalWithAdd} ${
            fullHeught ? styles.modalWithAdd_full : ""
          }`}
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

         <LoadingOverlay loading={!!loading}/>
        </TransitionProvider>
      </NewPortalProvider>
    </>
  );
};

export default ModalWithAdd;
