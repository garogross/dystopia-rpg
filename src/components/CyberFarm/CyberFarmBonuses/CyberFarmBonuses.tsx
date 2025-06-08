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

interface Props {
  show: boolean;
  onClose: () => void;
}
interface FormFieldProps {
  headerText: string;
  placeholder: string;
  commission?: string;
}

const Formfield: React.FC<FormFieldProps> = ({
  headerText,
  placeholder,
  commission,
}) => (
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
        Комиссия: {commission}
      </p>
    )}
  </label>
);

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
  return (
    <ModalWithAdd titleLg="Бонусы" show={show} onClose={onClose} fullHeught>
      <div className={styles.cyberFarmBonuses}>
        <button className={styles.cyberFarmBonuses__getByAddBtn}>
          <div className={styles.cyberFarmBonuses__getByAddBtnInner}>
            <ImageWebp
              src={cyberFarmBonusCpImage}
              srcSet={cyberFarmBonusCpImageWebp}
              alt="Bonuses"
              className={styles.cyberFarmBonuses__getByAddBtnImg}
              pictureClass={styles.cyberFarmBonuses__getByAddBtnPicture}
            />
            <span>Получайте +1 CP за просмотр рекламы</span>
          </div>
        </button>
        <FormBtn>
          <Walleticon />
          <span>Пополнить</span>
        </FormBtn>
        <h3 className={styles.cyberFarmBonuses__title}>TON</h3>
        <form className={styles.cyberFarmBonuses__form}>
          <Formfield
            headerText={"Ваш кошелёк"}
            placeholder={"Вставлять номер кошелька..."}
          />
          <Formfield
            headerText={"Сумма вывода (TON)"}
            placeholder={"0,5"}
            commission="0.003 TON"
          />
          <Formfield
            headerText={"Итого к получению"}
            placeholder={"Авторасчёт = сумма - комиссия..."}
          />
          <FormBtn>
            <WithdrawIcon />
            <span>Вывести</span>
          </FormBtn>
        </form>
      </div>
    </ModalWithAdd>
  );
};

export default CyberFarmBonuses;
