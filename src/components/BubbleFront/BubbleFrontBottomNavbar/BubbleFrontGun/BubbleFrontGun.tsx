import React, { useState, useEffect, useRef } from "react";
import styles from "./BubbleFrontGun.module.scss";
import ImageWebp from "../../../layout/ImageWebp/ImageWebp";
import {
  bubbleGunImage,
  bubbleGunImageWebp,
} from "../../../../assets/imageMaps";
import { useLocation, useNavigate } from "react-router-dom";
import { bubbleFrontPagePath } from "../../../../router/constants";
import { useAppSelector } from "../../../../hooks/redux";
import { BUBBLE_FRONT_GUN_ID } from "../../../../constants/bubbleFront/bubbleFrontGunId";

const BubbleFrontGun = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const [rotation, setRotation] = useState(0);
  const gunRef = useRef<HTMLDivElement>(null);

  const isMainPage = location.pathname === bubbleFrontPagePath;

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

  return (
    <div
      onClick={() => {
        if (!isMainPage) navigate(bubbleFrontPagePath);
      }}
      className={styles.bubbleFrontGun}
      ref={gunRef}
    >
      <ImageWebp
        src={bubbleGunImage}
        srcSet={bubbleGunImageWebp}
        alt="bubble gun"
        className={styles.bubbleFrontGun__img}
        id={BUBBLE_FRONT_GUN_ID}
        data-rotation={rotation}
        style={{
          transform: `translateX(-50%) rotate(${rotation}deg)`,
        }}
      />
    </div>
  );
};

export default BubbleFrontGun;
