import React, { FC, ReactNode } from "react";

import styles from "./RadioList.module.scss";
import { CheckBoxIcon } from "../icons/Checkbox/CheckBoxIcon";

interface Props {
  arr: { value: string; label: ReactNode }[];
  onChange: (value: string) => void;
  name: string;
  checked: string;
}

const RadioList: FC<Props> = ({ arr, onChange, name, checked }) => {
  return (
    <div className={styles.radioList}>
      {arr.map((item, index) => {
        const value = typeof item === "object" ? item.value : item;
        return (
          <div key={index} className={styles.radioList__radio}>
            <input
              type="radio"
              checked={checked === value}
              onChange={(e) => onChange(e.target.value)}
              name={name}
              value={value}
              id={value + name + "Radio"}
              className={styles.radioList__input}
            />
            <CheckBoxIcon />
            <label
              htmlFor={value + name + "Radio"}
              className={styles.radioList__label}
            >
              {item.label}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default RadioList;
