import React, { FC, useRef, useEffect, useState } from "react";
import TitleH3 from "../../../layout/TitleH3/TitleH3";
import MainInput from "../../../layout/MainInput/MainInput";
import { ArrowIcon, SearchLupeIcon } from "../../../layout/icons/Common";

import {
  dummyClan1Image,
  dummyClan2Image,
  dummyClan3Image,
  dummyClan4Image,
  dummyClan5Image,
  dummyClan6Image,
} from "../../../../assets/imageMaps";
import { IIncluenceClan } from "../../../../models/Influence/IIncluenceClan";
import { ELanguages } from "../../../../constants/ELanguages";
import {
  CreateClanIcon,
  JoinClanIcon,
  LanguageIcon,
  MembersIcon,
  PrivateIcon,
} from "../../../layout/icons/Influence/InfluenceClans";
import { HeaderWings } from "../../../layout/icons/RPGGame/Common";
import styles from "./InfluenceClans.module.scss";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";

const typeNames: Record<IIncluenceClan["type"], string> = {
  public: "Публичный",
  private: "Закрытый",
};

const filtersData = [
  {
    name: "Уровень",
    keyName: "level",
    options: [
      {
        value: "0-10",
        label: "0-10",
      },
      {
        value: "10-20",
        label: "10-20",
      },
      {
        value: "20-50",
        label: "20-50",
      },
      {
        value: "50+",
        label: "50+",
      },
    ],
  },
  {
    name: "Состав",
    keyName: "members",
    options: [
      {
        value: "0-10",
        label: "0-10",
      },
      {
        value: "10-20",
        label: "10-20",
      },
      {
        value: "20-50",
        label: "20-50",
      },
      {
        value: "50+",
        label: "50+",
      },
    ],
  },
  {
    name: "тип",
    keyName: "type",
    options: [
      {
        value: "public",
        label: "Публичный",
      },
      {
        value: "private",
        label: "Закрытый",
      },
    ],
  },
  {
    name: "Язык",
    keyName: "language",
    options: [
      {
        value: "rus",
        label: "RUS",
      },
      {
        value: "eng",
        label: "ENG",
      },
    ],
  },
];

const clans: IIncluenceClan[] = [
  {
    id: "1",
    image: dummyClan1Image,
    name: "ГИЛДИЯ ОКУПАНТОВ",
    level: 3,
    members: 45,
    maxMembers: 50,
    language: ELanguages.ru,
    type: "public",
    description: "Элитный клан опытных бойцов в киберпанк мире",
  },
  {
    id: "2",
    image: dummyClan2Image,
    name: "Тень Протокола",
    level: 2,
    members: 50,
    maxMembers: 60,
    language: ELanguages.ru,
    type: "public",
    description: "Дружелюбное сообщество для игроков всех уровней",
  },
  {
    id: "3",
    image: dummyClan3Image,
    name: "Black Resonance",
    level: 5,
    members: 30,
    maxMembers: 55,
    language: ELanguages.en,
    type: "private",
    description: "Aggressive tactics, high rewards",
  },
  {
    id: "4",
    image: dummyClan4Image,
    name: "Ash Syndicate",
    level: 3,
    members: 36,
    maxMembers: 40,
    language: ELanguages.en,
    type: "private",
    description: "Elite international organization",
  },
  {
    id: "5",
    image: dummyClan5Image,
    name: "Звено 404",
    level: 3,
    members: 45,
    maxMembers: 60,
    language: ELanguages.ru,
    type: "public",
    description:
      "Молодой клан с большими амбициями. Ищем активных игроков для роста и развития.",
  },
  {
    id: "6",
    image: dummyClan6Image,
    name: "братство NOD",
    level: 3,
    members: 45,
    maxMembers: 60,
    language: ELanguages.ru,
    type: "public",
    description: "Ужасающий орден жрецов-воинов Братства",
  },
];

type SelectProps = (typeof filtersData)[0] & {
  value: string;
  onChange: (val: string) => void;
};

const Select: FC<SelectProps> = ({ name, options, value, onChange }) => {
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const dropDownOpenedRef = useRef(dropdownOpened);

  const selectedItem = options.find((item) => item.value === value);

  const onCloseDropdown = () => {
    setDropdownOpened(false);
  };

  useEffect(() => {
    dropDownOpenedRef.current = dropdownOpened;
  }, [dropdownOpened]);

  useEffect(() => {
    const ref = [selectRef];
    const checkIfClickedOutside = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isRef = ref.every(
        (value) => value.current && !value.current.contains(el)
      );

      if (dropDownOpenedRef.current && isRef) {
        onCloseDropdown();
      }
    };
    document.addEventListener("click", checkIfClickedOutside);

    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, []);

  return (
    <div className={styles.influenceClans__select} ref={selectRef}>
      <button
        className={`${styles.influenceClans__selectBtn} ${
          dropdownOpened ? styles.influenceClans__selectBtn_active : ""
        }`}
        onClick={() => setDropdownOpened(true)}
      >
        <div className={styles.influenceClans__selectBtnInner}>
          <span>{selectedItem?.label || name}</span>
          <ArrowIcon rotate={dropdownOpened} />
        </div>
      </button>
      <TransitionProvider
        inProp={dropdownOpened}
        style={TransitionStyleTypes.opacity}
        className={styles.influenceClans__selectDropdownContent}
      >
        {options.map((option) => (
          <button
            className={styles.influenceClans__dropdonContentItem}
            key={option.value}
            onClick={() => {
              onChange(option.value);
              setDropdownOpened(false);
            }}
          >
            {option.label}
          </button>
        ))}
      </TransitionProvider>
    </div>
  );
};

const InfluenceClans = () => {
  const [filters, setFilters] = useState(
    filtersData.reduce((acc, cur) => {
      acc[cur.keyName] = "";
      return acc;
    }, {} as Record<string, string>)
  );
  const [selectedItemId, setSelectedItemId] = useState("");

  return (
    <div className={`${styles.influenceClans} container`}>
      <TitleH3 wingsReverse={false} hideDotline>
        клан
      </TitleH3>
      <div className={styles.influenceClans__main}>
        <MainInput placeholder="Поиск..." icon={<SearchLupeIcon />} />

        <div className={styles.influenceClans__filters}>
          {filtersData.map((filter) => (
            <Select
              key={filter.keyName}
              {...filter}
              value={filters[filter.keyName]}
              onChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  [filter.keyName]: value,
                }))
              }
            />
          ))}
        </div>
        <div className={styles.influenceClans__list}>
          {clans.map((clan) => (
            <button
              key={clan.id}
              onClick={() => setSelectedItemId(clan.id)}
              className={`${styles.influenceClans__listItem} ${
                selectedItemId === clan.id
                  ? styles.influenceClans__listItem_active
                  : ""
              }`}
            >
              <img
                src={clan.image}
                alt={clan.name}
                className={styles.influenceClans__listItemImg}
              />
              <div className={styles.influenceClans__listItemMain}>
                <div className={styles.influenceClans__listItemTopBlock}>
                  <h4 className={styles.influenceClans__nameText}>
                    {clan.name}
                  </h4>
                  <span className={styles.influenceClans__levelText}>
                    Уровень {clan.level}
                  </span>
                </div>
                <div className={styles.influenceClans__settings}>
                  <div className={styles.influenceClans__settingsItem}>
                    <MembersIcon />
                    <span>
                      {clan.members}/{clan.maxMembers}
                    </span>
                  </div>
                  <div className={styles.influenceClans__settingsItem}>
                    <LanguageIcon />
                    <span>{clan.language.toUpperCase()}</span>
                  </div>
                  <div className={styles.influenceClans__settingsItem}>
                    <PrivateIcon />
                    <span>{typeNames[clan.type]}</span>
                  </div>
                </div>
                <p className={styles.influenceClans__description}>
                  {clan.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className={styles.influenceClans__footer}>
        <button
          disabled={!selectedItemId}
          className={styles.influenceClans__footerBtn}
        >
          <div className={styles.influenceClans__footerBtnInner}>
            <JoinClanIcon />
            <span>Вступать в клан</span>
          </div>
        </button>
        <button className={styles.influenceClans__footerBtn}>
          <div className={styles.influenceClans__footerBtnInner}>
            <CreateClanIcon />
            <span>Создать клан</span>
          </div>
        </button>
        <div className={styles.influenceClans__wings}>
          <HeaderWings reversed />
        </div>
      </div>
    </div>
  );
};

export default InfluenceClans;
