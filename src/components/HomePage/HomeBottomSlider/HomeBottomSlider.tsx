import React, { useRef, useState } from "react";

import styles from "./HomeBottomSlider.module.scss";
import {
  bottomslide1Image,
  bottomslide1ImageWebp,
  bottomslide2Image,
  bottomslide2ImageWebp,
  bottomslide3Image,
  bottomslide3ImageWebp,
  bottomslide4Image,
  bottomslide4ImageWebp,
  bottomslide5Image,
  bottomslide5ImageWebp,
  bottomslide6Image,
  bottomslide6ImageWebp,
} from "../../../assets/images";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import { Navigation } from "swiper/modules";

import ImageWebp from "../../layout/ImageWebp/ImageWebp";

import "swiper/css";
import HomeSliderArrow from "../../layout/icons/Home/HomeSliderArrow";

const slides = [
  {
    img: bottomslide1Image,
    webp: bottomslide1ImageWebp,
  },
  {
    img: bottomslide2Image,
    webp: bottomslide2ImageWebp,
  },
  {
    img: bottomslide3Image,
    webp: bottomslide3ImageWebp,
  },
  {
    img: bottomslide4Image,
    webp: bottomslide4ImageWebp,
  },
  {
    img: bottomslide5Image,
    webp: bottomslide5ImageWebp,
  },
  {
    img: bottomslide6Image,
    webp: bottomslide6ImageWebp,
  },
  {
    img: bottomslide1Image,
    webp: bottomslide1ImageWebp,
  },
  {
    img: bottomslide2Image,
    webp: bottomslide2ImageWebp,
  },
];

const SlideImage = ({
  isCenter,
  src,
  srcSet,
}: {
  isCenter: boolean;
  src: string;
  srcSet: string;
}) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <ImageWebp
      className={
        `${styles.homeBottomSlider__slideImg} ` +
        (isCenter ? styles.homeBottomSlider__slideImg_active : "")
      }
      pictureClass={`${styles.homeBottomSlider__picture} ${
        loaded ? styles.homeBottomSlider__picture_loaded : ""
      }`}
      srcSet={srcSet}
      src={src}
      alt={"slide"}
      onLoad={() => setLoaded(true)}
    />
  );
};

const HomeBottomSlider = () => {
  const nextButtonRef = useRef(null);
  const prevButtonRef = useRef(null);
  const [centerIndex, setCenterIndex] = useState(0);

  return (
    <section className={styles.homeBottomSlider}>
      <Swiper
        spaceBetween={0}
        slidesPerView={3}
        centeredSlides={false}
        loop={true}
        modules={[Navigation]}
        navigation={{
          nextEl: styles.projectsHeader__arrowBtn_prev,
          prevEl: styles.projectsHeader__arrowBtn_next,
        }}
        breakpoints={{
          576: {
            spaceBetween: 10,
            slidesPerView: 6,
            centeredSlides: true,
          },
        }}
        className={styles.projectsHeader__sliderMain}
        onBeforeInit={(swiper: SwiperType) => {
          if (typeof swiper.params.navigation === "object")
            swiper.params.navigation.nextEl = nextButtonRef.current;
          if (typeof swiper.params.navigation === "object")
            swiper.params.navigation.prevEl = prevButtonRef.current;
        }}
        onSlideChange={(swiper: SwiperType) => {
          // For centeredSlides, the activeIndex is the center slide
          setCenterIndex(swiper.realIndex + 1);
        }}
        onSwiper={(swiper: SwiperType) => {
          setCenterIndex(swiper.realIndex + 1);
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className={
              index === centerIndex ? styles.homeBottomSlider__slide_active : ""
            }
          >
            <SlideImage
              isCenter={index === centerIndex}
              srcSet={slide.webp}
              src={slide.img}
            />
          </SwiperSlide>
        ))}

        <button
          ref={prevButtonRef}
          className={`${styles.homeBottomSlider__arrowBtn} ${styles.homeBottomSlider__arrowBtn_prev}`}
        >
          <HomeSliderArrow />
        </button>
        <button
          ref={nextButtonRef}
          className={`${styles.homeBottomSlider__arrowBtn} ${styles.homeBottomSlider__arrowBtn_next}`}
        >
          <HomeSliderArrow rotate />
        </button>
      </Swiper>
    </section>
  );
};

export default HomeBottomSlider;
