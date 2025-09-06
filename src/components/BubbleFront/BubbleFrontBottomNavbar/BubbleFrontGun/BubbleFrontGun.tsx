import React, { useState, useEffect, useRef } from "react";
import styles from "./BubbleFrontGun.module.scss";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import {
  chemicalBombImage,
  chemicalBombImageWebp,
  fireBallImage,
  fireBallImageWebp,
  gunFireImage,
  gunFireImageWebp,
  iceBallImage,
  iceBallImageWebp,
  lightingBallImage,
  lightingBallImageWebp,
  miniNecroBallImage,
  miniNecroBallImageWebp,
  nekroBallImage,
  nekroBallImageWebp,
  nuclearBallImage,
  nuclearBallImageWebp,
} from "../../../../assets/imageMaps";
import { useMatch, useNavigate } from "react-router-dom";
import { bubbleFrontPagePath } from "../../../../router/constants";
import { useAppSelector } from "../../../../hooks/redux";
import { BUBBLE_FRONT_GUN_ID } from "../../../../constants/bubbleFront/bubbleFrontGunId";
import { EBubbleFrontBalls } from "../../../../constants/bubbleFront/EBubbleFrontBalls";
import { getAngle } from "../../../../utils/bubbleFront/getAngle";

const BALLS = {
  [EBubbleFrontBalls.FIRE_BALL]: [fireBallImage, fireBallImageWebp],
  [EBubbleFrontBalls.CHEMICAL_BOMB]: [chemicalBombImage, chemicalBombImageWebp],
  [EBubbleFrontBalls.ICE_BALL]: [iceBallImage, iceBallImageWebp],
  [EBubbleFrontBalls.LIGHTING_BALL]: [lightingBallImage, lightingBallImageWebp],
  [EBubbleFrontBalls.NUCLEAR_BALL]: [nuclearBallImage, nuclearBallImageWebp],
  [EBubbleFrontBalls.NEKRO_BALL]: [nekroBallImage, nekroBallImageWebp],
  [EBubbleFrontBalls.MINI_NEKRO_BALL]: [
    miniNecroBallImage,
    miniNecroBallImageWebp,
  ],
};

const BubbleFrontGun = () => {
  const navigate = useNavigate();
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isInited, setIsInited] = useState(false);
  const gunRef = useRef<HTMLDivElement>(null);
  const nextBalls = useAppSelector(
    (state) => state.bubbleFront.global.nextBalls
  );

  const isMainPage = useMatch(bubbleFrontPagePath);

  useEffect(() => {
    if (!gameInited) return;

    // Shared logic for both mouse and touch
    const computeAndSetRotation = (clientX: number, clientY: number) => {
      if (!gunRef.current) return;

      const gunRect = gunRef.current.getBoundingClientRect();
      const gunCenterX = gunRect.left + gunRect.width / 2;
      const gunCenterY = gunRect.top + gunRect.height / 2;

      const adjustedAngle = getAngle(clientX, clientY, gunCenterX, gunCenterY);

      setRotation(adjustedAngle);
    };

    const handleMouseMove = (event: MouseEvent) => {
      computeAndSetRotation(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches && event.touches.length > 0) {
        const touch = event.touches[0];
        computeAndSetRotation(touch.clientX, touch.clientY);
      }
    };

    // Also update on touchend (using the last touch point)
    const handleTouchEnd = (event: TouchEvent) => {
      if (event.changedTouches && event.changedTouches.length > 0) {
        const touch = event.changedTouches[0];
        computeAndSetRotation(touch.clientX, touch.clientY);
      }
    };

    if (isMainPage) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd, { passive: false });
    } else {
      setRotation(0);

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMainPage, gameInited]);

  useEffect(() => {
    if (nextBalls?.length && nextBalls[0] !== EBubbleFrontBalls.NEKRO_BALL) {
      if (isInited) {
        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
        }, 300);
      } else {
        setIsInited(true);
      }
    }
  }, [isInited, nextBalls]);

  return (
    <div
      onClick={() => {
        if (!isMainPage) navigate(bubbleFrontPagePath);
      }}
      className={styles.bubbleFrontGun}
      ref={gunRef}
    >
      <div
        className={`${styles.bubbleFrontGun__wrapper} ${
          isAnimating ? styles.bubbleFrontGun__wrapper_animate : ""
        }`}
        id={BUBBLE_FRONT_GUN_ID}
        data-rotation={rotation}
        style={{
          transform: `translateX(-50%) rotate(${rotation}deg)`,
        }}
      >
        <ImageWebp
          srcSet={gunFireImageWebp}
          src={gunFireImage}
          alt={"fire"}
          className={`${styles.bubbleFrontGun__gunFireImg} ${
            isAnimating ? styles.bubbleFrontGun__gunFireImg_anim : ""
          }`}
        />
        {nextBalls && (
          <>
            <ImageWebp
              srcSet={BALLS[nextBalls[0]][1]}
              src={BALLS[nextBalls[0]][0]}
              alt={"ball"}
              className={`${styles.bubbleFrontGun__ballImg} ${
                isAnimating ? styles.bubbleFrontGun__ballImg_anim : ""
              } ${styles.bubbleFrontGun__ballImg_next}`}
            />
            <ImageWebp
              srcSet={BALLS[nextBalls[1]][1]}
              src={BALLS[nextBalls[1]][0]}
              alt={"ball"}
              className={`${styles.bubbleFrontGun__ballImg} ${
                isAnimating ? styles.bubbleFrontGun__ballImg_anim : ""
              } ${styles.bubbleFrontGun__ballImg_preNext}`}
            />
          </>
        )}
        {/* <ImageWebp
          src={bubbleGunImage}
          srcSet={bubbleGunImageWebp}
          alt="bubble gun"
          className={styles.bubbleFrontGun__img}
        /> */}
      </div>
    </div>
  );
};

export default BubbleFrontGun;
