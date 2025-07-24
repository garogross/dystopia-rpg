import React, { FC, ReactNode } from "react";
import TitleH3 from "../../../layout/TitleH3/TitleH3";
import { useAppSelector } from "../../../../hooks/redux";
import {
  ArrowIcon,
  CopyIcon,
  DotslineLong,
  EditIcon,
} from "../../../layout/icons/Common";
import { InfoDropDownArrowIcon } from "../../../layout/icons/Influence/InfluencePlayer";
import { BuyWalletIcon } from "../../../layout/icons/Common";

import styles from "./InfluencePlayer.module.scss";
import { CheckBoxIcon } from "../../../layout/icons/Checkbox/CheckBoxIcon";

const groupAOptions = [
  {
    value: "+7.5",
    label: "- +7.5% к восстановлению ОД (20 СР)",
  },
  {
    value: "-10_attack",
    label: "−10% к атаке (20 СР)",
  },
  {
    value: "-10_build",
    label: "−10% к строительству (20 СР)",
  },
  {
    value: "-15_repair",
    label: "−15% к ремонту (20 СР)",
  },
];
const groupBOptions = [
  {
    value: "+5",
    label: "+5% к восстановлению ОД (30 СР)",
  },
  {
    value: "-7.5_attack",
    label: "−7.5% к атаке (30 СР)",
  },
  {
    value: "-7.5_build",
    label: "−7.5% к строительству (30 СР)",
  },
  {
    value: "-10_repair",
    label: "−10% к ремонту (30 СР)",
  },
];

const Dropdown = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className={styles.influencePlayer__dropdown}>
      <button className={styles.influencePlayer__dropdownBtn}>
        <span>{title}</span>
        <span className={styles.influencePlayer__dropdownBtnDotsline}>
          <DotslineLong preserveAspectRatio />
        </span>
        <ArrowIcon />
      </button>
      <div className={styles.influencePlayer__dropdownContent}>{children}</div>
    </div>
  );
};

const CheckBox = ({
  checked,
  onChange,
  name,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  name: string;
}) => (
  <div className={styles.influencePlayer__checkBox}>
    <input
      onChange={(e) => onChange(e.target.checked)}
      value={name}
      id={name + "Checkbox"}
      name={name}
      type="checkbox"
      checked={checked}
      className={styles.influencePlayer__checkBoxInput}
    />
    <label
      htmlFor={name + "Checkbox"}
      className={styles.influencePlayer__checkBoxLabel}
    >
      {name}
    </label>
  </div>
);

interface RadiolistProps {
  arr: { value: string; label: string }[];
  onChange: (value: string) => void;
  name: string;
  checked: string;
}

const RadioList: FC<RadiolistProps> = ({ arr, onChange, name, checked }) => {
  return (
    <div className={styles.influencePlayer__radioList}>
      {arr.map((item, index) => {
        const value = typeof item === "object" ? item.value : item;
        return (
          <div key={index} className={styles.influencePlayer__radioListRadio}>
            <input
              type="radio"
              checked={checked === value}
              onChange={(e) => onChange(e.target.value)}
              name={name}
              value={value}
              id={value + name + "Radio"}
              className={styles.influencePlayer__radioListInput}
            />
            <CheckBoxIcon />
            <label
              htmlFor={value + name + "Radio"}
              className={styles.influencePlayer__radioListLabel}
            >
              {item.label}
            </label>
          </div>
        );
      })}
    </div>
  );
};

const InfluencePlayer = () => {
  const avatar = useAppSelector((state) => state.profile.avatar);
  const username = useAppSelector((state) => state.profile.username);
  const tgId = useAppSelector((state) => state.profile.tgId);
  return (
    <section className={styles.influencePlayer}>
      <TitleH3>Player</TitleH3>
      <div className={styles.influencePlayer__main}>
        <div className={styles.influencePlayer__mainHeader}>
          <div className={styles.influencePlayer__mainHeaderInner}>
            <div className={styles.influencePlayer__mainAvatar}>
              {avatar && (
                <img
                  src={avatar}
                  alt="avatar"
                  className={styles.influencePlayer__mainAvatarImg}
                />
              )}
            </div>
          </div>
          <div className={styles.influencePlayer__mainHeaderContent}>
            <button className={styles.influencePlayer__nameEditBtn}>
              <span>{username}</span>
              <EditIcon />
            </button>
            <div className={styles.influencePlayer__dropdownArrowWrapper}>
              <InfoDropDownArrowIcon />
            </div>
          </div>
        </div>
        <div className={styles.influencePlayer__mainDropdownContent}>
          <div className={styles.influencePlayer__mainDropdownContentCol}>
            <span className={styles.influencePlayer__boldText}>ID:</span>
            <span className={styles.influencePlayer__valueText}>{tgId}</span>
            <CopyIcon />
          </div>
          <div className={styles.influencePlayer__mainDropdownContentCol}>
            <span className={styles.influencePlayer__boldText}>Клан: </span>
            <span className={styles.influencePlayer__valueText}>
              Звёздные морпехи
            </span>
          </div>
          <div className={styles.influencePlayer__mainDropdownContentCol}>
            <span className={styles.influencePlayer__boldText}>
              Снижение стоимости в ОД{" "}
            </span>
            <span className={styles.influencePlayer__dotsLine}>
              <DotslineLong preserveAspectRatio />{" "}
            </span>
          </div>
          <div className={styles.influencePlayer__mainDropdownContentCol}>
            <span className={styles.influencePlayer__boldText}>
              - атака сектора:{" "}
            </span>
            <span className={styles.influencePlayer__valueText}>−10%</span>
          </div>
          <div className={styles.influencePlayer__mainDropdownContentCol}>
            <span className={styles.influencePlayer__boldText}>
              - строительство:
            </span>
            <span className={styles.influencePlayer__valueText}>−5%</span>
          </div>
          <div className={styles.influencePlayer__mainDropdownContentCol}>
            <span className={styles.influencePlayer__boldText}>
              - ремонт строений:
            </span>
            <span className={styles.influencePlayer__valueText}>−20%</span>
          </div>
        </div>
      </div>
      <Dropdown title="Усиления на игровую сессию">
        <>
          <p className={styles.influencePlayer__boldText}>
            Одиночные усиления:
          </p>
          <CheckBox
            checked={false}
            onChange={(val) => {}}
            name={"- +20 макс. ОД, +1 к восстановлению (5 СР)"}
          />
          <CheckBox
            checked={true}
            onChange={(val) => {}}
            name={"- +10 макс. ОД, +1 к восстановлению (10 СР)"}
          />
          <CheckBox
            checked={false}
            onChange={(val) => {}}
            name={"- +2 к восстановлению (10 СР)"}
          />
          <CheckBox
            checked={false}
            onChange={(val) => {}}
            name={"- +40 макс. ОД (5 СР)"}
          />
          <CheckBox
            checked={false}
            onChange={(val) => {}}
            name={"- +25 макс. ОД (10 СР)"}
          />
          <CheckBox
            checked={false}
            onChange={(val) => {}}
            name={"- +15 макс. ОД (10 СР)"}
          />
          <p className={styles.influencePlayer__boldText}>
            Выбор только одной опции из группы A
          </p>
          <RadioList
            arr={groupAOptions}
            onChange={(val) => {}}
            name={"groupA"}
            checked={""}
          />
          <RadioList
            arr={groupBOptions}
            onChange={(val) => {}}
            name={"groupB"}
            checked={""}
          />
          <button className={styles.influencePlayer__btn}>
            <div className={styles.influencePlayer__btnInner}>
              <BuyWalletIcon />
              <span>Купить</span>
            </div>
          </button>
        </>
      </Dropdown>
      <Dropdown title="Бонусы от достижений">
        <>
          <p className={styles.influencePlayer__boldText}>
            - До +15 макс. ОД (навсегда)
          </p>
          <p className={styles.influencePlayer__boldText}>
            - До −15% стоимости в ОД атаки сектора
          </p>
          <p className={styles.influencePlayer__boldText}>
            - До −15% стоимости в ОД строительства
          </p>
          <p className={styles.influencePlayer__boldText}>
            - До +2.5 максимальной траты ОД за ход
          </p>
          <p className={styles.influencePlayer__boldText}>
            - До −25% к стоимости в ОД ремонта строений
          </p>
        </>
      </Dropdown>
      <Dropdown title="Бонусы от клана">
        <>
          <p className={styles.influencePlayer__boldText}>
            - До +15 макс. ОД (навсегда)
          </p>
          <p className={styles.influencePlayer__boldText}>
            - До −15% стоимости в ОД атаки сектора
          </p>
          <p className={styles.influencePlayer__boldText}>
            - До −15% стоимости в ОД строительства
          </p>
          <p className={styles.influencePlayer__boldText}>
            - До +2.5 максимальной траты ОД за ход
          </p>
          <p className={styles.influencePlayer__boldText}>
            - До −25% к стоимости в ОД ремонта строений
          </p>
        </>
      </Dropdown>
    </section>
  );
};

export default InfluencePlayer;
