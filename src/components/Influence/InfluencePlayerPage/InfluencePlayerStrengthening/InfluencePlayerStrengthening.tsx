import React, { useState } from "react";

import styles from "./InfluencePlayerStrengthening.module.scss";
import { BuyWalletIcon } from "../../../layout/icons/Common";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../../hooks/redux";
import RadioList from "../../../layout/RadioList/RadioList";

const {
  singleBuffsText,
  chooseOneOptionGroupAText,
  chooseOneOptionGroupBText,
  buyButtonText,
  groupAOptionsTexts,
  groupBOptionsTexts,
  checkBoxOptionsTexts,
} = TRANSLATIONS.influence.player.strengthening;

const groupAOptions = [
  {
    value: "+7.5_ap_recovery",
    percent: 7.5,
    cashPoint: 20,
    translationKey: groupAOptionsTexts.apRecoveryText,
  },
  {
    value: "-10_attack",
    percent: 10,
    cashPoint: 20,
    translationKey: groupAOptionsTexts.attackText,
  },
  {
    value: "-10_construction",
    percent: 10,
    cashPoint: 20,
    translationKey: groupAOptionsTexts.constructionText,
  },
  {
    value: "-15_repair",
    percent: 15,
    cashPoint: 20,
    translationKey: groupAOptionsTexts.repairText,
  },
];

const groupBOptions = [
  {
    value: "+5_ap_recovery",
    percent: 5,
    cashPoint: 30,
    translationKey: groupBOptionsTexts.apRecoveryText,
  },
  {
    value: "-7.5_attack",
    percent: 7.5,
    cashPoint: 30,
    translationKey: groupBOptionsTexts.attackText,
  },
  {
    value: "-7.5_construction",
    percent: 7.5,
    cashPoint: 30,
    translationKey: groupBOptionsTexts.constructionText,
  },
  {
    value: "-10_repair",
    percent: 10,
    cashPoint: 30,
    translationKey: groupBOptionsTexts.repairText,
  },
];

const checkBoxOptions = [
  {
    value: "+20_max_od_1_recovery_5_sr",
    maxOd: 20,
    recovery: 1,
    cashPoint: 5,
    translationKey: checkBoxOptionsTexts.maxOdAndRecoveryText,
  },
  {
    value: "+10_max_od_1_recovery_10_sr",
    maxOd: 10,
    recovery: 1,
    cashPoint: 10,
    translationKey: checkBoxOptionsTexts.maxOdAndRecoveryText,
  },
  {
    value: "+2_recovery_10_sr",
    recovery: 2,
    cashPoint: 10,
    translationKey: checkBoxOptionsTexts.recoveryText,
  },
  {
    value: "+40_max_od_5_sr",
    maxOd: 40,
    cashPoint: 5,
    translationKey: checkBoxOptionsTexts.maxOdText,
  },
];

const CheckBox = ({
  checked,
  onChange,
  name,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  name: string;
}) => (
  <div className={styles.influencePlayerStrengthening__checkBox}>
    <input
      onChange={(e) => onChange(e.target.checked)}
      value={name}
      id={name + "Checkbox"}
      name={name}
      type="checkbox"
      checked={checked}
      className={styles.influencePlayerStrengthening__checkBoxInput}
    />
    <label
      htmlFor={name + "Checkbox"}
      className={styles.influencePlayerStrengthening__checkBoxLabel}
    >
      {name}
    </label>
  </div>
);

const InfluencePlayerStrengthening = () => {
  const language = useAppSelector((state) => state.ui.language);
  const [selectedSingleBoosts, setSelectedSingleBoosts] = useState<string[]>(
    []
  );
  const [selectedGroupAOption, setSelectedGroupAOption] = useState("");
  const [selectedGroupBOption, setSelectedGroupBOption] = useState("");

  const getTranslatedOptions = (options: typeof groupAOptions) => {
    return options.map((item) => ({
      value: item.value,
      label: item.translationKey[language]
        .replace("CASH_POINT", item.cashPoint.toString())
        .replace("PERCENT", item.percent.toString()),
    }));
  };

  return (
    <>
      <p className={styles.influencePlayerStrengthening__boldText}>
        {singleBuffsText[language]}:
      </p>
      {checkBoxOptions.map((item) => (
        <CheckBox
          key={item.value}
          checked={selectedSingleBoosts.includes(item.value)}
          onChange={(val) => {
            setSelectedSingleBoosts((prev) =>
              val ? [...prev, item.value] : prev.filter((v) => v !== item.value)
            );
          }}
          name={item.translationKey[language]
            .replace("RECOVERY", item.recovery?.toString() || "")
            .replace("MAX_OD", item.maxOd?.toString() || "")}
        />
      ))}

      <p className={styles.influencePlayerStrengthening__boldText}>
        {chooseOneOptionGroupAText[language]}
      </p>
      <RadioList
        arr={getTranslatedOptions(groupAOptions)}
        onChange={(val) => setSelectedGroupAOption(val)}
        name={"groupA"}
        checked={selectedGroupAOption}
      />
      <p className={styles.influencePlayerStrengthening__boldText}>
        {chooseOneOptionGroupBText[language]}
      </p>
      <RadioList
        arr={getTranslatedOptions(groupBOptions)}
        onChange={(val) => setSelectedGroupBOption(val)}
        name={"groupB"}
        checked={selectedGroupBOption}
      />
      <button className={styles.influencePlayerStrengthening__btn}>
        <div className={styles.influencePlayerStrengthening__btnInner}>
          <BuyWalletIcon />
          <span>{buyButtonText[language]}</span>
        </div>
      </button>
    </>
  );
};

export default InfluencePlayerStrengthening;
