import {
  tutorialGirlImage,
  tutorialGirlImageWebp,
} from "../../assets/imageMaps";
import React, { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { TRANSLATIONS } from "../../constants/TRANSLATIONS";
import Backdrop from "../layout/Backdrop/Backdrop";
import NewPortalProvider from "../../providers/NewPortalProvider";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../providers/TransitionProvider";
import ImageWebp from "../layout/ImageWebp/ImageWebp";
import { CloseIcon, NextIcon } from "../layout/icons/TutorialPopup";
import styles from "./TutorialPopup.module.scss";
import WrapperWithFrame from "../layout/WrapperWithFrame/WrapperWithFrame";
import {
  finsihTutorial,
  setTutorialInProgress,
  updateTutorialProgress,
} from "../../store/slices/cyberFarm/tutorialSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { CYBERFARM_EVO_TUTORIAL_PROGRESS } from "../../constants/cyberfarmEvo/tutorial";

const { closeText, nextText } = TRANSLATIONS.tutorialPopup;

interface Props {}

const TutorialPopup: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const siteLanguage = useAppSelector((state) => state.ui.language);
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const tutorialInProgress = useAppSelector(
    (state) => state.cyberfarm.tutorial.tutorialInProgress
  );
  const tutorialProgressIndex = useAppSelector(
    (state) => state.cyberfarm.tutorial.tutorialProgressIndex
  );
  const mainRef = useRef<HTMLDivElement>(null);
  const progress = CYBERFARM_EVO_TUTORIAL_PROGRESS;
  const curTutorial = progress[tutorialProgressIndex];
  const show = tutorialInProgress && !!curTutorial?.text && gameInited;

  useEffect(() => {
    if (tutorialInProgress && curTutorial.page) {
      navigate(curTutorial.page);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tutorialInProgress]);

  const onClose = () => {
    dispatch(setTutorialInProgress(false));
    dispatch(finsihTutorial());
  };

  const onNext = () => {
    const isLastSlide = tutorialProgressIndex === progress.length - 1;

    if (isLastSlide) {
      onClose();
    } else {
      if (curTutorial.isFinish) dispatch(finsihTutorial());
      dispatch(updateTutorialProgress());
    }
  };

  if (
    !curTutorial?.text ||
    (curTutorial.inPage && location.pathname !== curTutorial.inPage)
  )
    return null;

  return (
    <>
      <Backdrop inProp={show} onClose={onClose} highZIndex />

      <NewPortalProvider>
        <TransitionProvider
          style={TransitionStyleTypes.opacity}
          className={styles.tutorialPopup}
          inProp={show}
        >
          <ImageWebp
            src={tutorialGirlImage}
            srcSet={tutorialGirlImageWebp}
            alt="firl"
            className={styles.tutorialPopup__img}
          />
          <WrapperWithFrame withoutBorder size="lg">
            <div className={styles.tutorialPopup__main} ref={mainRef}>
              <div className={styles.tutorialPopup__mainTextsWrapper}>
                <p className={styles.tutorialPopup__mainText}>
                  {curTutorial?.text[siteLanguage]}
                </p>
              </div>
              <div className={styles.tutorialPopup__btnsWrapper}>
                <button
                  className={`${styles.tutorialPopup__btn} ${styles.tutorialPopup__btn_prev}`}
                  onClick={() => onClose()}
                >
                  <div className={styles.tutorialPopup__btnInner}>
                    <CloseIcon />
                    <span>{closeText[siteLanguage]}</span>
                  </div>
                </button>
                <button
                  onClick={onNext}
                  className={`${styles.tutorialPopup__btn} ${styles.tutorialPopup__btn_next}`}
                >
                  <div className={styles.tutorialPopup__btnInner}>
                    <NextIcon />
                    <span>{nextText[siteLanguage]}</span>
                  </div>
                </button>
              </div>
            </div>
          </WrapperWithFrame>
        </TransitionProvider>
      </NewPortalProvider>
    </>
  );
};

export default TutorialPopup;
