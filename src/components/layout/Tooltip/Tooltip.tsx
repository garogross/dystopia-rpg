import NewPortalProvider from "../../../providers/NewPortalProvider";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";
import styles from "./Tooltip.module.scss";

interface Props {
  show: boolean;
  text: string;
}
const Tooltip: React.FC<Props> = ({ show, text }) => {
  return (
    <NewPortalProvider>
      <TransitionProvider
        duration={200}
        style={TransitionStyleTypes.bottom}
        inProp={show}
        className={styles.tootlip}
      >
        <div className={styles.tootlip__wrapper}>
          <p className={styles.tootlip__text}>{text}</p>
        </div>
      </TransitionProvider>
    </NewPortalProvider>
  );
};

export default Tooltip;
