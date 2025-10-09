import React, { ReactNode, useEffect, useState } from "react";

import styles from "./CyberFarmBonuses.module.scss";
import ModalWithAdd from "../../layout/ModalWithAdd/ModalWithAdd";
import {
  FormFieldWind,
  WithdrawIcon,
} from "../../layout/icons/CyberFarmBonuses";
import { DotsLine } from "../../layout/icons/RPGGame/Common";
import { TRANSLATIONS } from "../../../constants/TRANSLATIONS";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import Tooltip from "../../layout/Tooltip/Tooltip";
import { useFormValue } from "../../../hooks/useFormValue";
import {
  getWithdrawRates,
  withdrawCP,
} from "../../../store/slices/profileSlice";
import LoadingOverlay from "../../layout/LoadingOverlay/LoadingOverlay";
import { useTooltip } from "../../../hooks/useTooltip";
import FormSelect from "../../layout/FormSelect/FormSelect";

interface Props {
  show: boolean;
  onClose: () => void;
}
interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  headerText: string;
  placeholder: string;
  commission?: string;
  isInvalid?: boolean;
  options?: {
    value: string;
    label: string;
  }[];
  onSelectChange?: (val: string) => void;
}

const {
  bonusesText,
  walletText,
  currencyText,
  currencyPlaceholder,
  walletPlaceholder,
  withdrawAmountText,
  withdrawAmountPlaceholder,
  commissionText,
  totalToReceiveText,
  totalToReceivePlaceholder,
  withdrawText,
  withdrawCompletedText,
  withdrawFailedText,
  setAllText,
  amountAfterCommissionMustBeGreaterThanZeroText,
  amountExceedsCPBalanceText,
  invalidCurrencyText,
  walletAddressRequiredText,
  commentText,
  tonWithdrawCommentPlaceholder,
  depositLabel,
  withdrawLabel,
} = TRANSLATIONS.cyberFarm.bonuses;

const Formfield: React.FC<FormFieldProps> = ({
  headerText,
  placeholder,
  commission,
  isInvalid,
  options,
  value,
  onSelectChange,
  ...args
}) => {
  const language = useAppSelector((state) => state.ui.language);
  return (
    <label className={styles.cyberFarmBonuses__form}>
      <div className={styles.cyberFarmBonuses__formFieldHeader}>
        <p className={styles.cyberFarmBonuses__formFieldHeaderText}>
          {headerText}
        </p>
        <FormFieldWind />
      </div>
      {options && onSelectChange ? (
        <FormSelect
          name={placeholder}
          options={options}
          value={value as string}
          onChange={onSelectChange}
        />
      ) : (
        <input
          type="text"
          {...args}
          value={value}
          placeholder={placeholder}
          className={`${styles.cyberFarmBonuses__input} ${
            isInvalid ? styles.cyberFarmBonuses__input_invalid : ""
          }`}
        />
      )}
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
  const [withdrawSettings, setWithdrawSettings] = useState({
    ton: {
      rate: 0,
      commission: 0,
    },
    usdt: {
      rate: 0,
      commission: 0,
    },
  });

  const cp = useAppSelector((state) => state.profile.stats.cp);
  // const {
  //   onShowAd,
  //   showTooltip: showAdTooltip,
  //   tooltipText: addTooltipText,
  // } = useVideoAd({});
  const { show: showTooltip, openTooltip } = useTooltip();
  const {
    onChange,
    onChangeSelect,
    setError,
    getCurError,
    formData,
    onResetForm,
  } = useFormValue({
    address: "",
    amount: "",
    memo: "",
    currency: "usdt",
  });
  const [loading, setLoading] = useState(false);
  const [tooltipText, setTooltipText] = useState(withdrawCompletedText);

  const commision =
    withdrawSettings[(formData.currency as "usdt" | "ton") || "usdt"] || 0;

  const withdrawWithCommision = Math.max(
    +formData.amount * commision.rate - commision.commission,
    0
  );

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await dispatch(getWithdrawRates()).unwrap();
        const rates = res.rates_per_1000cp;
        const commisions = res.commissions;
        setWithdrawSettings({
          ton: {
            rate: rates.ton / 1000,
            commission: commisions.commission_ton_abs,
          },
          usdt: {
            rate: rates.usdt / 1000,
            commission: commisions.commission_usdt_abs,
          },
        });
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!show) onResetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!formData.address) {
      setTooltipText(walletAddressRequiredText);
      openTooltip();
      setError((prev) => ({ ...prev, address: "invalid" }));
      return;
    }
    if (withdrawWithCommision <= 0) {
      setTooltipText(amountAfterCommissionMustBeGreaterThanZeroText);
      setError((prev) => ({ ...prev, amount: "invalid" }));
      openTooltip();
      return;
    }
    if (+formData.amount > cp) {
      setTooltipText(amountExceedsCPBalanceText);
      openTooltip();
      setError((prev) => ({ ...prev, amount: "invalid" }));
      return;
    }
    const currencies = ["usdt", "ton"];
    if (!formData.currency || !currencies.includes(formData.currency)) {
      setTooltipText(invalidCurrencyText);
      openTooltip();
      setError((prev) => ({ ...prev, currency: "invalid" }));
      return;
    }

    try {
      setLoading(true);
      await dispatch(
        withdrawCP({
          ...formData,
          currency: formData.currency as "usdt" | "ton",
          amount: +formData.amount,
        })
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
      hideAd
    >
      <div className={styles.cyberFarmBonuses}>
        {/* <button
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
        </button> */}

        <div className={styles.cyberFarmBonuses__tabs}>
          <button disabled className={styles.cyberFarmBonuses__tabBtn}>
            {depositLabel[language]}
          </button>
          <button className={styles.cyberFarmBonuses__tabBtn}>
            {withdrawLabel[language]}
          </button>
        </div>
        <form onSubmit={onSubmit} className={styles.cyberFarmBonuses__form}>
          <Formfield
            headerText={currencyText[language]}
            placeholder={currencyPlaceholder[language]}
            name="currency"
            onSelectChange={(val) => onChangeSelect("currency", val)}
            value={formData.currency}
            isInvalid={!!getCurError("currency")}
            options={[
              {
                value: "ton",
                label: "TON",
              },
              {
                value: "usdt",
                label: "USDT",
              },
            ]}
          />
          <Formfield
            headerText={walletText[language]}
            placeholder={walletPlaceholder[language]}
            onChange={onChange}
            name="address"
            value={formData.address}
            isInvalid={!!getCurError("address")}
          />
          <div>
            <Formfield
              headerText={withdrawAmountText[language]}
              placeholder={withdrawAmountPlaceholder[language]}
              commission={`${commision.commission} CP`}
              name="amount"
              onChange={onChange}
              value={formData.amount}
              isInvalid={!!getCurError("amount")}
            />
            <button
              type="button"
              onClick={() => onChangeSelect("amount", cp)}
              className={styles.cyberFarmBonuses__setAllBtn}
            >
              {setAllText[language]} ({+cp.toFixed(2)})
            </button>
          </div>
          <Formfield
            headerText={commentText[language]}
            placeholder={tonWithdrawCommentPlaceholder[language]}
            onChange={onChange}
            name="memo"
            value={formData.memo}
          />
          <Formfield
            headerText={totalToReceiveText[language]}
            placeholder={totalToReceivePlaceholder[language]}
            value={withdrawWithCommision}
            isInvalid={!!formData.amount && withdrawWithCommision <= 0}
          />
          <FormBtn disabled={loading}>
            <WithdrawIcon />
            <span>{withdrawText[language]}</span>
          </FormBtn>
        </form>
      </div>
      {/* <Tooltip show={showAdTooltip} text={addTooltipText} /> */}
      <Tooltip show={showTooltip} text={tooltipText[language]} />
      <LoadingOverlay loading={loading} />
    </ModalWithAdd>
  );
};

export default CyberFarmBonuses;
