import React, { ReactNode } from "react";

import styles from "./HackTerminalWrapperWithScreenBg.module.scss";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import {
  hackTerminalMainFrameImage,
  hackTerminalMainFrameImageWebp,
} from "../../../assets/imageMaps/hackTerminalImages";

interface Props {
  children: ReactNode;
  className?: string;
  wrapperclass?: string;
}

const HackTerminalWrapperWithScreenBg: React.FC<Props> = ({
  children,
  className,
  wrapperclass,
}) => {
  return (
    <div
      className={`${styles.hackTerminalWrapperWithScreenBg} ${
        wrapperclass || ""
      }`}
    >
      <div
        className={`${styles.hackTerminalWrapperWithScreenBg__wrapper} ${
          className || ""
        }`}
      >
        {children}
      </div>
      <ImageWebp
        srcSet={hackTerminalMainFrameImageWebp}
        src={hackTerminalMainFrameImage}
        alt={"screen frame"}
        className={styles.hackTerminalWrapperWithScreenBg__img}
      />
    </div>
  );
};

export default HackTerminalWrapperWithScreenBg;
