import React, { ReactNode } from "react";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import { useAppSelector } from "../../../hooks/redux";
import styles from "./MainInput.module.scss";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
  asTextarea?: false;
};

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  icon?: ReactNode;
  asTextarea: true;
};

type Props = InputProps | TextareaProps;

const MainInput: React.FC<Props> = ({
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
      className={`${styles.mainInput} ${className}`}
    >
      <>
        {asTextarea ? (
          <textarea className={styles.mainInput__input} {...(args as TextareaProps)} />
        ) : (
          <input
            className={styles.mainInput__input}
            {...(args as InputProps)}
          />
        )}
        {icon}
      </>
    </TransitionProvider>
  );
};

export default MainInput;
