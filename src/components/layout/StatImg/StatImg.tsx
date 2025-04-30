import React from 'react';

import styles from "./StatImg.module.scss";
import { EStats } from '../../../constants/EStats';
import ImageWebp from '../ImageWebp/ImageWebp';
import { statImages } from '../../../constants/statImages';

interface Props {
  stat: EStats;
  className?: string;
  size?: number;
}

const StatImg: React.FC<Props> = ({ stat, className, size = 12 }) => {
  return (
    <div style={{ width: size, height: size }} className={`${styles.statImg} ${className || ""}`}>
      <ImageWebp
        src={statImages[stat].img}
        srcSet={statImages[stat].imgWebp}
        alt={stat}
        className={styles.statImg__img}
      />
    </div>
  );
};

export default StatImg;