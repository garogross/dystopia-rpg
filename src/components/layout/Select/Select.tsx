import React, { FC, useEffect, useRef, useState } from "react";

import styles from "./Select.module.scss";
import { TranslationItemType } from "../../../types/TranslationItemType";
import { useAppSelector } from "../../../hooks/redux";
import { ArrowIcon } from "../icons/Common";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";

interface Props {
  name: TranslationItemType | string;
  options: {
    value: string;
    label: string;
  }[];
  value: string;
  onChange: (val: string) => void;
  wrapperClass?: string;
  btnClass?: string;
  btnInnerClass?: string;
}

const Select: FC<Props> = ({
  name,
  options,
  value,
  onChange,
  wrapperClass,
  btnClass,
  btnInnerClass,
}) => {
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
    <div className={`${styles.select} ${wrapperClass || ""}`} ref={selectRef}>
      <button
        className={`${styles.select__btn} ${btnClass || ""} ${
          dropdownOpened ? styles.select__btn_active : ""
        }`}
        type="button"
        onClick={() => setDropdownOpened((prev) => !prev)}
      >
        <div className={`${styles.select__btnInner} ${btnInnerClass || ""}`}>
          <span>
            {selectedItem?.label ||
              (typeof name === "string" ? name : name[language])}
          </span>
          <ArrowIcon rotate={dropdownOpened} />
        </div>
      </button>
      <TransitionProvider
        inProp={dropdownOpened}
        style={TransitionStyleTypes.opacity}
        className={styles.select__dropdownContent}
      >
        {options.map((option) => (
          <button
            type="button"
            className={styles.select__dropdonContentItem}
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

export default Select;
