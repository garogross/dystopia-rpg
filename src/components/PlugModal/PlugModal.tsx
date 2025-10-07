import React from "react";
import { TRANSLATIONS } from "../../constants/TRANSLATIONS";
import { useAppSelector } from "../../hooks/redux";
import styles from "./PlugModal.module.scss";
import LoadingOverlay from "../layout/LoadingOverlay/LoadingOverlay";
const { updatingText } = TRANSLATIONS.plugModal;

const PlugModal = () => {
  const language = useAppSelector((state) => state.ui.language);
  return (
    <div className={styles.plugModal}>
      <LoadingOverlay loading={true} text={updatingText[language]} />
    </div>
  );
};

export default PlugModal;
