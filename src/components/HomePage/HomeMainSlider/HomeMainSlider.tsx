import React, { useState } from "react";
import HomeSliderArrow from "../../layout/icons/Home/HomeSliderArrow";

import styles from "./HomeMainSlider.module.scss";
import { useImageLoader } from "../../../hooks/useImageLoader";
import {
  slidesSpriteImageWebp,
  phoneFrame1ImageWebp,
  phoneFrame2ImageWebp,
  phoneFrame3ImageWebp,
  phoneFrame4ImageWebp,
  phoneFrame5ImageWebp,
} from "../../../assets/images";

const TOTAL_SLIDES = 9;

const frames = [
  phoneFrame1ImageWebp,
  phoneFrame2ImageWebp,
  phoneFrame3ImageWebp,
  phoneFrame4ImageWebp,
  phoneFrame5ImageWebp,
];

const hiddenStyleOnLoad = (loading: boolean) => ({
  opacity: loading ? 0 : 1,
});

const HomeMainSlider = () => {
  const spriteLoading = useImageLoader([slidesSpriteImageWebp]);
  const framesLoading = useImageLoader(frames);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesToShow = 5;

  // Swipe state
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? TOTAL_SLIDES - slidesToShow : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === TOTAL_SLIDES - slidesToShow ? 0 : prev + 1
    );
  };

  // Touch event handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(null);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const distance = touchStartX - touchEndX;
      if (distance > 50) {
        handleNext();
      } else if (distance < -50) {
        handlePrev();
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <section
      style={hiddenStyleOnLoad(framesLoading)}
      className={`${styles.homeMainSlider} homeContainer`}
    >
      <button
        className={`${styles.homeMainSlider__arrowBtn} ${styles.homeMainSlider__arrowBtn_prev}`}
        onClick={handlePrev}
        aria-label="Previous slides"
      >
        <HomeSliderArrow />
      </button>
      <div
        className={styles.homeMainSlider__main}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {Array.from({ length: slidesToShow }).map((_, index) => {
          const spriteIndex = (currentIndex + index) % TOTAL_SLIDES;
          const totalSlides = 9;
          const percentStep = 100 / (totalSlides - 1);
          const backgroundPos = `${spriteIndex * percentStep}% center`;

          return (
            <div key={index} className={styles.homeMainSlider__slide}>
              <div
                className={styles.homeMainSlider__slideImg}
                style={{
                  backgroundPosition: backgroundPos,
                  ...hiddenStyleOnLoad(spriteLoading),
                }}
              />
            </div>
          );
        })}
      </div>
      <button
        className={`${styles.homeMainSlider__arrowBtn} ${styles.homeMainSlider__arrowBtn_next}`}
        onClick={handleNext}
        aria-label="Next slides"
      >
        <HomeSliderArrow rotate />
      </button>
    </section>
  );
};

export default HomeMainSlider;
