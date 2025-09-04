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
  nuclearBallImage,
  nuclearBallImageWebp,
} from "../../../../assets/imageMaps";
import { useMatch, useNavigate } from "react-router-dom";
import { bubbleFrontPagePath } from "../../../../router/constants";
import { useAppSelector } from "../../../../hooks/redux";
import { BUBBLE_FRONT_GUN_ID } from "../../../../constants/bubbleFront/bubbleFrontGunId";
import { EBubbleFrontBalls } from "../../../../constants/bubbleFront/EBubbleFrontBalls";

const BALLS = {
  [EBubbleFrontBalls.FIRE_BALL]: [fireBallImage, fireBallImageWebp],
  [EBubbleFrontBalls.CHEMICAL_BOMB]: [chemicalBombImage, chemicalBombImageWebp],
  [EBubbleFrontBalls.ICE_BALL]: [iceBallImage, iceBallImageWebp],
  [EBubbleFrontBalls.LIGHTING_BALL]: [lightingBallImage, lightingBallImageWebp],
  [EBubbleFrontBalls.NUCLEAR_BALL]: [nuclearBallImage, nuclearBallImageWebp],
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
    const handleMouseMove = (event: MouseEvent) => {
      if (!gunRef.current) return;

      const gunRect = gunRef.current.getBoundingClientRect();
      const gunCenterX = gunRect.left + gunRect.width / 2;
      const gunCenterY = gunRect.top + gunRect.height / 2;

      const mouseX = event.clientX;
      const mouseY = event.clientY;

      // Calculate angle between gun center and mouse position
      const deltaX = mouseX - gunCenterX;
      const deltaY = mouseY - gunCenterY;
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      // Convert to degrees and adjust for gun's natural orientation
      // Assuming the gun points right by default (0 degrees)
      let adjustedAngle = angle + 90;

      // Limit rotation to reasonable bounds (e.g., -45 to 45 degrees)
      adjustedAngle = Math.max(-45, Math.min(45, adjustedAngle));

      setRotation(adjustedAngle);
    };

    if (isMainPage) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      setRotation(0);

      window.removeEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMainPage, gameInited]);

  useEffect(() => {
    if (nextBalls?.length) {
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
