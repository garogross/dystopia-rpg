import React, { ReactNode, useEffect } from "react";

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
import { adBannerRenderers } from "../../../utils/adBannerRenderers";

const ONCLICKA_SLOT = "6077989";

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
  hideAd?: boolean;
  titleClass?: string;
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
  errorText,
  hideAd,
  titleClass,
}) => {
  const language = useAppSelector((state) => state.ui.language);
  const onClicka = adBannerRenderers.onclicka;

  useEffect(() => {
    if (show && !hideAd) onClicka.init(ONCLICKA_SLOT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

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
      {title && (
        <h4 className={`${styles.modalWithAdd__titleText} ${titleClass || ""}`}>
          {title}
        </h4>
      )}{" "}
      <div className={styles.modalWithAdd__content}>{children}</div>
      <TransitionProvider
        inProp={!!errored}
        style={TransitionStyleTypes.height}
        height={30}
        className={styles.modalWithAdd__error}
      >
        <span>{errorText || somethingWentWrong[language]}</span>
      </TransitionProvider>
      {!hideAd && (
        <div className={styles.modalWithAdd__adWrapper}>
          {onClicka.render(ONCLICKA_SLOT)}
        </div>
      )}
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

          <LoadingOverlay loading={!!loading} />
        </TransitionProvider>
      </NewPortalProvider>
    </>
  );
};

export default ModalWithAdd;
