import React, { ReactNode } from "react";

import styles from "./CyberFarmBonuses.module.scss";
import ModalWithAdd from "../../layout/ModalWithAdd/ModalWithAdd";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import {
  cyberFarmBonusCpImage,
  cyberFarmBonusCpImageWebp,
} from "../../../assets/imageMaps";
import { Walleticon } from "../../layout/icons/Common";
import {
  FormFieldWind,
  WithdrawIcon,
} from "../../layout/icons/CyberFarmBonuses";
import { DotsLine } from "../../layout/icons/RPGGame/Common";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../hooks/redux";
import { useGlobalAdController } from "../../../hooks/useGlobalAdController";
import { EAdTypes } from "../../../constants/EAdTypes";

interface Props {
  show: boolean;
  onClose: () => void;
}
interface FormFieldProps {
  headerText: string;
  placeholder: string;
  commission?: string;
}

const {
  bonusesText,
  walletText,
  walletPlaceholder,
  withdrawAmountText,
  withdrawAmountPlaceholder,
  commissionText,
  totalToReceiveText,
  totalToReceivePlaceholder,
  watchAdText,
  depositText,
  withdrawText,
} = TRANSLATIONS.cyberFarm.bonuses;

const Formfield: React.FC<FormFieldProps> = ({
  headerText,
  placeholder,
  commission,
}) => {
  const language = useAppSelector((state) => state.ui.language);
  return (
    <label className="{styles.cyberFarmBonuses__form}">
      <div className={styles.cyberFarmBonuses__formFieldHeader}>
        <p className={styles.cyberFarmBonuses__formFieldHeaderText}>
          {headerText}
        </p>
        <FormFieldWind />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className={styles.cyberFarmBonuses__input}
      />
      {commission && (
        <p className={styles.cyberFarmBonuses__formFieldDescriptionText}>
          {commissionText[language]}: {commission}
        </p>
      )}
    </label>
  );
};

const FormBtn = ({ children }: { children: ReactNode }) => (
  <div className={styles.cyberFarmBonuses__btnWrapper}>
    <div className={styles.cyberFarmBonuses__btnDotline}>
      <DotsLine />
    </div>
    <button className={styles.cyberFarmBonuses__btn}>
      <div className={styles.cyberFarmBonuses__btnInner}>{children}</div>
    </button>
    <div className={styles.cyberFarmBonuses__btnDotline}>
      <DotsLine />
    </div>
  </div>
);
const CyberFarmBonuses: React.FC<Props> = ({ show, onClose }) => {
  const language = useAppSelector((state) => state.ui.language);
    const onShowAd = useGlobalAdController(EAdTypes.ADSGRAM_V, "11778");

  return (
    <ModalWithAdd
      titleLg={bonusesText[language]}
      show={show}
      onClose={onClose}
      fullHeught
    >
      <div className={styles.cyberFarmBonuses}>
        <button className={styles.cyberFarmBonuses__getByAddBtn} onClick={onShowAd}>
          <div className={styles.cyberFarmBonuses__getByAddBtnInner}>
            <ImageWebp
              src={cyberFarmBonusCpImage}
              srcSet={cyberFarmBonusCpImageWebp}
              alt="Bonuses"
              className={styles.cyberFarmBonuses__getByAddBtnImg}
              pictureClass={styles.cyberFarmBonuses__getByAddBtnPicture}
            />
            <span>{watchAdText[language]}</span>
          </div>
        </button>
        <FormBtn>
          <Walleticon />
          <span>{depositText[language]}</span>
        </FormBtn>
        <h3 className={styles.cyberFarmBonuses__title}>TON</h3>
        <form className={styles.cyberFarmBonuses__form}>
          <Formfield
            headerText={walletText[language]}
            placeholder={walletPlaceholder[language]}
          />
          <Formfield
            headerText={withdrawAmountText[language]}
            placeholder={withdrawAmountPlaceholder[language]}
            commission="0.003 TON"
          />
          <Formfield
            headerText={totalToReceiveText[language]}
            placeholder={totalToReceivePlaceholder[language]}
          />
          <FormBtn>
            <WithdrawIcon />
            <span>{withdrawText[language]}</span>
          </FormBtn>
        </form>
      </div>
    </ModalWithAdd>
  );
};

export default CyberFarmBonuses;
