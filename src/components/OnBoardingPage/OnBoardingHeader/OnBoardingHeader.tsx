import React from 'react';

import styles from "./OnBoardingHeader.module.scss";

interface Props {
  
}

const OnBoardingHeader: React.FC<Props> = (props) => {
  return <header className={styles.onBoardingHeader}>
    <h1 className={styles.onBoardingHeader__title}>Добро пожаловать в</h1>
    <h2 className={styles.onBoardingHeader__appName}>Dystopia Game</h2>
    <h5 className={styles.onBoardingHeader__subtitle}>Здесь играют по своим правилам!</h5>
  </header>;
};

export default OnBoardingHeader;