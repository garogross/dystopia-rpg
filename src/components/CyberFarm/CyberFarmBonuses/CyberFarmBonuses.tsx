import React, { ReactNode, useEffect, useState } from "react";

import styles from "./CyberFarmBonuses.module.scss";
import ModalWithAdd from "../../layout/ModalWithAdd/ModalWithAdd";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import {
  cyberFarmBonusCpImage,
  cyberFarmBonusCpImageWebp,
} from "../../../assets/imageMaps";
import {
  FormFieldWind,
  WithdrawIcon,
} from "../../layout/icons/CyberFarmBonuses";
import { DotsLine } from "../../layout/icons/RPGGame/Common";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import Tooltip from "../../layout/Tooltip/Tooltip";
import { useVideoAd } from "../../../hooks/useVideoAd";
import { useFormValue } from "../../../hooks/useFormValue";
import { withdrawTon } from "../../../store/slices/profileSlice";
import LoadingOverlay from "../../layout/LoadingOverlay/LoadingOverlay";
import { useTooltip } from "../../../hooks/useTooltip";

interface Props {
  show: boolean;
  onClose: () => void;
}
interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
  withdrawText,
  withdrawCompletedText,
  withdrawFailedText,
} = TRANSLATIONS.cyberFarm.bonuses;
const { loadAdText } = TRANSLATIONS.errors;

const Formfield: React.FC<FormFieldProps> = ({
  headerText,
  placeholder,
  commission,
  ...args
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
        {...args}
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

const FormBtn = ({
  children,
  disabled,
}: {
  children: ReactNode;
  disabled?: boolean;
}) => (
  <div className={styles.cyberFarmBonuses__btnWrapper}>
    <div className={styles.cyberFarmBonuses__btnDotline}>
      <DotsLine />
    </div>
    <button disabled={disabled} className={styles.cyberFarmBonuses__btn}>
      <div className={styles.cyberFarmBonuses__btnInner}>{children}</div>
    </button>
    <div className={styles.cyberFarmBonuses__btnDotline}>
      <DotsLine />
    </div>
  </div>
);
const CyberFarmBonuses: React.FC<Props> = ({ show, onClose }) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);
  const tonWithdrawCommission = useAppSelector(
    (state) => state.profile.tonWithdrawCommission
  );
  const ton = useAppSelector((state) => state.profile.stats.ton);
  const { onShowAd, showTooltip: showAdTooltip } = useVideoAd();
  const { show: showTooltip, openTooltip } = useTooltip();
  const { onChange, formData, onResetForm } = useFormValue({
    address: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [tooltipText, setTooltipText] = useState(withdrawCompletedText);

  const withdrawWithCommision = Math.max(
    +formData.amount - tonWithdrawCommission,
    0
  );
  useEffect(() => {
    if (!show) onResetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await dispatch(
        withdrawTon({ ...formData, amount: +formData.amount })
      ).unwrap();
      setTooltipText(withdrawCompletedText);
    } catch (error) {
      setTooltipText(withdrawFailedText);
      // handle error if needed
    } finally {
      setLoading(false);
      openTooltip();
    }
  };

  return (
    <ModalWithAdd
      titleLg={bonusesText[language]}
      show={show}
      onClose={onClose}
      fullHeught
    >
      <div className={styles.cyberFarmBonuses}>
        <button
          className={styles.cyberFarmBonuses__getByAddBtn}
          onClick={onShowAd}
        >
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

        <h3 className={styles.cyberFarmBonuses__title}>TON</h3>
        <form onSubmit={onSubmit} className={styles.cyberFarmBonuses__form}>
          <Formfield
            headerText={walletText[language]}
            placeholder={walletPlaceholder[language]}
            name="address"
            onChange={onChange}
            value={formData.address}
          />
          <Formfield
            headerText={withdrawAmountText[language]}
            placeholder={withdrawAmountPlaceholder[language]}
            commission={`${tonWithdrawCommission} TON`}
            name="amount"
            onChange={onChange}
            value={formData.amount}
          />
          <Formfield
            headerText={totalToReceiveText[language]}
            placeholder={totalToReceivePlaceholder[language]}
            disabled
            value={withdrawWithCommision}
          />
          <FormBtn
            disabled={
              withdrawWithCommision <= 0 ||
              +formData.amount > ton ||
              loading ||
              !formData.address
            }
          >
            <WithdrawIcon />
            <span>{withdrawText[language]}</span>
          </FormBtn>
        </form>
      </div>
      <Tooltip show={showAdTooltip} text={loadAdText[language]} />
      <Tooltip show={showTooltip} text={tooltipText[language]} />
      <LoadingOverlay loading={loading} />
    </ModalWithAdd>
  );
};

export default CyberFarmBonuses;
