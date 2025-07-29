import React, { useState, ReactNode } from "react";
import { useAppSelector } from "../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";

import styles from "./Accordion.module.scss";
import { ArrowIcon, DotslineLong } from "../icons/Common";

const Accordion = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  const [opened, setOpened] = useState(false);

  return (
    <TransitionProvider
      inProp={gameInited}
      style={TransitionStyleTypes.zoomIn}
      className={styles.accordion}
    >
      <button
        className={styles.accordion__dropdownBtn}
        onClick={() => setOpened((prev) => !prev)}
      >
        <span>{title}</span>
        <span className={styles.accordion__dropdownBtnDotsline}>
          <DotslineLong preserveAspectRatio />
        </span>
        <ArrowIcon rotate={opened} />
      </button>
      <TransitionProvider
        inProp={opened}
        style={TransitionStyleTypes.height}
        height={500}
        className={styles.accordion__dropdownContent}
      >
        {children}
      </TransitionProvider>
    </TransitionProvider>
  );
};

export default Accordion;
