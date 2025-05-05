
import { ChangeEvent, FC, ReactNode } from "react";
import styles from "./Checkbox.module.scss";

interface CheckboxProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  className?: string;
  labelClass?: string;
  name: string;
  children: string | ReactNode;
  checked?: boolean;
  disableLabel?: boolean;
}

const Checkbox: FC<CheckboxProps> = ({
  onChange,
  value,
  className,
  labelClass,
  name,
  children,
  checked,
  disableLabel,
}) => {
  return (
    <div className={`${styles.checkbox} ${className ? className : ""}`}>
      <input
        onChange={(e) => onChange(e)}
        value={value}
        id={value + name + "Checkbox"}
        name={name}
        type="checkbox"
        checked={checked}
        className={styles.checkbox__input}
      />
      <label
        htmlFor={!disableLabel ? value + name + "Checkbox" : undefined}
        className={`${styles.checkbox__label} ${labelClass || ""}`}
      >
        <span>{children}</span>
      </label>
    </div>
  );
};

export default Checkbox;
