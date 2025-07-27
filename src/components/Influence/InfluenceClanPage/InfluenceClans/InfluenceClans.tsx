import React, { FC, useRef, useEffect, useState } from "react";
import TitleH3 from "../../../layout/TitleH3/TitleH3";
import MainInput from "../../../layout/MainInput/MainInput";
import { ArrowIcon, SearchLupeIcon } from "../../../layout/icons/Common";

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
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { TranslationItemType } from "../../../../types/TranslationItemType";
import { useAppSelector } from "../../../../hooks/redux";
import { influenceClans } from "../../../../dummyData/influenceClans";

const {
  titleText,
  filterstexts,
  typeOptionsTexts,
  levelText,
  joinClanButtonText,
  createClanButtonText,
} = TRANSLATIONS.influence.clans;
const { searchText } = TRANSLATIONS.common;

const typeNames: Record<IIncluenceClan["type"], TranslationItemType> = {
  public: typeOptionsTexts.public,
  private: typeOptionsTexts.private,
};

const getFiltersData = (language: ELanguages) => [
  {
    name: filterstexts.level,
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
    name: filterstexts.members,
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
    name: filterstexts.type,
    keyName: "type",
    options: [
      {
        value: "public",
        label: typeOptionsTexts.public[language],
      },
      {
        value: "private",
        label: typeOptionsTexts.private[language],
      },
    ],
  },
  {
    name: filterstexts.language,
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

const clans = influenceClans;

type SelectProps = ReturnType<typeof getFiltersData>[0] & {
  value: string;
  onChange: (val: string) => void;
};

const Select: FC<SelectProps> = ({ name, options, value, onChange }) => {
  const language = useAppSelector((state) => state.ui.language);

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
          <span>{selectedItem?.label || name[language]}</span>
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
  const language = useAppSelector((state) => state.ui.language);
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const filtersData = getFiltersData(language);

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
        {titleText[language]}
      </TitleH3>
      <div className={styles.influenceClans__main}>
        <MainInput
          placeholder={searchText[language]}
          icon={<SearchLupeIcon />}
        />

        <TransitionProvider
          inProp={gameInited}
          style={TransitionStyleTypes.zoomIn}
          className={styles.influenceClans__filters}
        >
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
        </TransitionProvider>
        <TransitionProvider
          inProp={gameInited}
          style={TransitionStyleTypes.bottom}
          className={styles.influenceClans__list}
        >
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
                    {levelText[language]} {clan.level}
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
                    <span>{typeNames[clan.type][language]}</span>
                  </div>
                </div>
                <p className={styles.influenceClans__description}>
                  {clan.description}
                </p>
              </div>
            </button>
          ))}
        </TransitionProvider>
      </div>
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.zoomOut}
        className={styles.influenceClans__footer}
      >
        <button
          disabled={!selectedItemId}
          className={styles.influenceClans__footerBtn}
        >
          <div className={styles.influenceClans__footerBtnInner}>
            <JoinClanIcon />
            <span>{joinClanButtonText[language]}</span>
          </div>
        </button>
        <button className={styles.influenceClans__footerBtn}>
          <div className={styles.influenceClans__footerBtnInner}>
            <CreateClanIcon />
            <span>{createClanButtonText[language]}</span>
          </div>
        </button>
        <div className={styles.influenceClans__wings}>
          <HeaderWings reversed />
        </div>
      </TransitionProvider>
    </div>
  );
};

export default InfluenceClans;
