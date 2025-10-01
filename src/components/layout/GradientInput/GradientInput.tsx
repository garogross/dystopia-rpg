import React, { ReactNode } from "react";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import { useAppSelector } from "../../../hooks/redux";
import styles from "./GradientInput.module.scss";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
  asTextarea?: false;
};

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  icon?: ReactNode;
  asTextarea: true;
};

type Props = InputProps | TextareaProps;

const GradientInput: React.FC<Props> = ({
  className = "",
  icon,
  asTextarea,
  ...args
}) => {
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  return (
    <TransitionProvider
      inProp={gameInited}
      style={TransitionStyleTypes.zoomIn}
      className={`${styles.gradientInput} ${className}`}
    >
      <label className={styles.gradientInput__label}>
        {asTextarea ? (
          <textarea
            className={styles.gradientInput__input}
            {...(args as TextareaProps)}
          />
        ) : (
          <input
            className={styles.gradientInput__input}
            {...(args as InputProps)}
          />
        )}
        {icon}
      </label>
    </TransitionProvider>
  );
};

export default GradientInput;
