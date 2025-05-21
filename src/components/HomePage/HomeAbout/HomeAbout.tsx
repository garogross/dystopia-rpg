import React from "react";
import WrapperWithFrame from "../../layout/WrapperWithFrame/WrapperWithFrame";

import styles from "./HomeAbout.module.scss";

const HomeAbout = () => {
  return (
    <>
      <h1 className={`${styles.homeAbout__title} homeContainer`}>
        Dystopia Game
      </h1>
      <div className={`${styles.homeAbout__description} homeContainer`}>
        <WrapperWithFrame size={"lg"}>
          <div className={styles.homeAbout__descriptionInner}>
            <h4 className={styles.homeAbout__descriptionTitle}>
              <span
              className={styles.homeAbout__descriptionTitleNameText}
              ><span className={styles.homeAbout__descriptionTitleTrait}>- </span>Dystopia —</span> игра в разработке, но мы уже играем
              по-крупному
            </h4>
            <p className={styles.homeAbout__descriptionText}>
              Никаких обещаний. Только скрины, стиль и геймплей, который мы
              затачиваем под кровь и металл. Посмотри — и подпишись, чтобы не
              проспать запуск.
            </p>
          </div>
        </WrapperWithFrame>
      </div>
    </>
  );
};

export default HomeAbout;
