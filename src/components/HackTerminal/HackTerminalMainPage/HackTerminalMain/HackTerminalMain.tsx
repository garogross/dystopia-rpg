import React, { useEffect, useState } from "react";
import HackTerminalWrapperWithScreenBg from "../../HackTerminalWrapperWithScreenBg/HackTerminalWrapperWithScreenBg";
import {
  NextIcon,
  PrevIcon,
  ToggleArrowIcon,
} from "../../../layout/icons/HackTerminal/Main";
import styles from "./HackTerminalMain.module.scss";
import { useAppSelector } from "../../../../hooks/redux";
import HackTerminalStatusModal from "./HackTerminalStatusModal/HackTerminalStatusModal";
import LoadingOverlay from "../../../layout/LoadingOverlay/LoadingOverlay";
import { HACK_TERMINAL_STATUS_COLORS } from "../../../../constants/hackTerminal/hackTerminalStatusColors";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";

const PASS_NUM_COUNT = 6;
const COLORS = HACK_TERMINAL_STATUS_COLORS;

const { titleText, attemptsLeftText, historyTitleText, checkButtonText } =
  TRANSLATIONS.hackTerminal.main;

const HackTerminalMain = () => {
  const tgId = useAppSelector((state) => state.profile.tgId);
  const language = useAppSelector((state) => state.ui.language);
  const [modalOpened, setModalOpened] = useState(false);
  const [status, setStatus] = useState<0 | 1 | -1>(0); // 0 , 1 (win), -1 (lose)
  const initialWritedCode = Array.from({ length: PASS_NUM_COUNT })
    .map((_) => "0")
    .join("");
  const [writedCode, setWritedCode] = useState(initialWritedCode);
  const [attempts, setAttempts] = useState(6);
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatedCode, setGeneratedCode] = useState("");

  const [historyOpened, setHistoryOpened] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const fetchCode = async () => {
    try {
      const code = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(PASS_NUM_COUNT, "0");
      setGeneratedCode(code);
    } catch (error) {
      const code = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(PASS_NUM_COUNT, "0");
      setGeneratedCode(code);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (tgId) {
      fetchCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tgId]);

  const onChangeCode = (value: string, index: number) => {
    setWritedCode((prevState) => {
      const arr = prevState.split("");
      arr[index] = value;
      return arr.join("");
    });
  };

  const onCheck = async () => {
    if (!attempts) return;

    if (writedCode === generatedCode) {
      setLoading(true);

      setStatus(1);
      setModalOpened(true);
      setLoading(false);
      return;
    }

    if (attempts - 1 <= 0) {
      setStatus(-1);
      setModalOpened(true);
    }
    setAttempts((prevState) => prevState - 1);
    setHistory((prevState) => [writedCode, ...prevState]);

    // setIsAnimating(true);
    // setTimeout(() => {
    //   setActiveAdIndex((prevState) =>
    //     prevState === ads.length - 1 ? 0 : prevState + 1
    //   );
    // }, 500);
  };

  const onReset = async () => {
    setLoading(true);
    setModalOpened(false);
    setAttempts(PASS_NUM_COUNT);
    setHistory([]);
    setWritedCode(initialWritedCode);
    await fetchCode();
    setLoading(false);
  };

  const onClickArrow = (isBack?: boolean) => {
    const nextIndex = activeIndex + (isBack ? -1 : 1);
    if (nextIndex > writedCode.length - 1 || nextIndex < 0) return;

    setActiveIndex(nextIndex);
  };

  const onClickNum = (value: string) => {
    onChangeCode(value, activeIndex);
    if (activeIndex < writedCode.length - 1)
      setActiveIndex((prevState) => prevState + 1);
  };

  const getSymbolColor = (value: string, index: number, code: string) => {
    if (generatedCode.includes(value)) {
      if (generatedCode[index] === code[index]) {
        return COLORS.blue;
      } else {
        return COLORS.yellow;
      }
    } else {
      return COLORS.red;
    }
  };

  return (
    <HackTerminalWrapperWithScreenBg className={styles.hackTerminalMain}>
      <h4 className={styles.hackTerminalMain__title}>{titleText[language]}</h4>
      <h5 className={styles.hackTerminalMain__attemptsTexts}>
        {attemptsLeftText[language]} {attempts}
      </h5>
      <div className={styles.hackTerminalMain__password}>
        {writedCode.split("").map((item, index) => (
          <button
            onClick={() => setActiveIndex(index)}
            key={index}
            className={`${styles.hackTerminalMain__passwordNumBtn} ${
              activeIndex === index
                ? styles.hackTerminalMain__passwordNumBtn_active
                : ""
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <h6 className={styles.hackTerminalMain__historyText}>
        {historyTitleText[language]}
      </h6>
      <div
        className={`${styles.hackTerminalMain__historyList} ${
          historyOpened ? styles.hackTerminalMain__historyList_opened : ""
        }`}
      >
        {history.map((code, index) => (
          <div className={styles.hackTerminalMain__historyItem} key={index}>
            {code.split("").map((item, codeIndex) => (
              <span
                key={codeIndex}
                style={{ color: getSymbolColor(item, codeIndex, code) }}
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={() => setHistoryOpened((prevState) => !prevState)}
        className={styles.hackTerminalMain__historyToggleBtn}
      >
        <ToggleArrowIcon rotated={historyOpened} />
      </button>
      <button
        disabled={!attempts}
        onClick={onCheck}
        className={styles.hackTerminalMain__checkBtn}
      >
        <span className={styles.hackTerminalMain__checkBtnInner}>
          {checkButtonText[language]}
        </span>
      </button>
      <div
        className={`${styles.hackTerminalMain__numPad} ${
          historyOpened ? styles.hackTerminalMain__numPad_closed : ""
        }`}
      >
        {Array.from({ length: 9 }).map((_, index) => (
          <button
            onClick={() => onClickNum((index + 1).toString())}
            key={index}
            className={styles.hackTerminalMain__numPadBtn}
          >
            <div className={styles.hackTerminalMain__numPadBtnInner}>
              {index + 1}
            </div>
          </button>
        ))}
        <button
          className={styles.hackTerminalMain__numPadBtn}
          onClick={() => onClickArrow(true)}
        >
          <div className={styles.hackTerminalMain__numPadBtnInner}>
            <PrevIcon />
          </div>
        </button>
        <button
          onClick={() => onClickNum("0")}
          className={styles.hackTerminalMain__numPadBtn}
        >
          <div className={styles.hackTerminalMain__numPadBtnInner}>0</div>
        </button>
        <button
          onClick={() => onClickArrow(true)}
          className={styles.hackTerminalMain__numPadBtn}
        >
          <div className={styles.hackTerminalMain__numPadBtnInner}>
            <NextIcon />
          </div>
        </button>
      </div>
      <HackTerminalStatusModal
        show={modalOpened}
        isLose={status < 0}
        onReset={onReset}
        bonusValue={0.5}
      />
      <LoadingOverlay loading={loading} />
    </HackTerminalWrapperWithScreenBg>
  );
};

export default HackTerminalMain;
