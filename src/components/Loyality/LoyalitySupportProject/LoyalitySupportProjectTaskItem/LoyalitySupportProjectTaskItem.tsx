import { FeedItem } from "taddy-sdk-web";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../../providers/TransitionProvider";
import { ELanguages } from "../../../../constants/ELanguages";
import styles from "./LoyalitySupportProjectTaskItem.module.scss";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { cpImage } from "../../../../assets/imageMaps";

interface TaskItemProps {
  task: {
    id: string | number;
    title?: string;
    name?: string;
    description: string;
    image: string;
    price?: number;
    subscription?: boolean;
    byLink?: boolean;
    taddyTasktype?: FeedItem["type"];
    link?: string;
  };
  index: number;
  gameInited: boolean;
  language: ELanguages;
  isTaddyTask?: boolean;
  onSubscribe: (item: FeedItem) => void;
}

const TADDY_TASK_PRICE = 1;

const { subscribeText, subscribedText, visitText, getText } =
  TRANSLATIONS.loyality.supportProject;

const LoyalitySupportProjectTaskItem: React.FC<TaskItemProps> = ({
  task,
  index,
  gameInited,
  language,
  isTaddyTask,
  onSubscribe,
}) => {
  const title = task.title || task.name;
  const price = isTaddyTask ? TADDY_TASK_PRICE : task.price;

  return (
    <TransitionProvider
      inProp={gameInited}
      style={TransitionStyleTypes.bottom}
      delay={index * 100}
      className={`${styles.loyalitySupportProjectTaskItem} ${
        task.subscription ? styles.loyalitySupportProjectTaskItem_completed : ""
      }`}
      key={task.id}
    >
      <div className={styles.loyalitySupportProjectTaskItem__inner}>
        <div className={styles.loyalitySupportProjectTaskItem__main}>
          <img
            src={task.image}
            alt={title}
            className={styles.loyalitySupportProjectTaskItem__img}
          />
          <div className={styles.loyalitySupportProjectTaskItem__texts}>
            <p className={styles.loyalitySupportProjectTaskItem__name}>
              {title}
            </p>
            <p className={styles.loyalitySupportProjectTaskItem__description}>
              {task.description}
            </p>
          </div>
          <div className={styles.loyalitySupportProjectTaskItem__actions}>
            <button
              onClick={() =>
                onSubscribe({
                  id: task.id,
                  title: task.title || "",
                  description: task.description,
                  image: task.image,
                  type: task.taddyTasktype || "app",
                  link: task.link || "",
                })
              }
              disabled={task.subscription}
              className={styles.loyalitySupportProjectTaskItem__subscribeBtn}
            >
              {task.subscription
                ? subscribedText[language]
                : task.byLink
                ? visitText[language]
                : subscribeText[language]}
            </button>
            <button
              disabled={!task.subscription}
              className={styles.loyalitySupportProjectTaskItem__getBtn}
            >
              <div
                className={styles.loyalitySupportProjectTaskItem__getBtnInner}
              >
                <span>
                  {getText[language]} {price}CP
                </span>
                <img
                  src={cpImage}
                  alt="CP"
                  className={styles.loyalitySupportProjectTaskItem__getBtnImg}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </TransitionProvider>
  );
};

export default LoyalitySupportProjectTaskItem;
