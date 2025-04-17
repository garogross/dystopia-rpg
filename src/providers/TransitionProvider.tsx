import { FC, ReactNode } from "react";
import { animated, useTransition } from "react-spring";

export enum TransitionStyleTypes {
  opacity = "opacity",
  opacityLeave = "opacityLeave",
  rotateX = "rotateX",
  right = "right",
  translateX = "translateX",
  translateY = "translateY",
  maxHeight = "maxHeight",
}

interface TransitionProviderProps {
  style: TransitionStyleTypes;
  inProp: boolean;
  className?: string;
  duration?: number;
  maxheight?: string;
  children: ReactNode;
}

const TransitionProvider: FC<TransitionProviderProps> = ({
  style,
  inProp,
  className,
  duration,
  children,
  maxheight,
}) => {
  const transDuration = duration ? duration : 300;

  const styles = {
    [TransitionStyleTypes.opacity]: {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
    },
    [TransitionStyleTypes.opacityLeave]: {
      from: { opacity: 1 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
    },
    [TransitionStyleTypes.rotateX]: {
      from: { transform: "rotateX(90deg)" },
      enter: { transform: "rotateX(0deg)" },
      leave: { transform: "rotateX(90deg)" },
    },

    [TransitionStyleTypes.right]: {
      from: { right: "-630px" },
      enter: { right: "0" },
      leave: { right: "-630px" },
    },
    [TransitionStyleTypes.translateX]: {
      from: { translateX: "100%" },
      enter: { translateX: "0%" },
      leave: { translateX: "100%" },
    },
    [TransitionStyleTypes.translateY]: {
      from: { opacity: 0, translateY: "-60px" },
      enter: { opacity: 1, translateY: "0%" },
      leave: { opacity: 0, translateY: "-60px" },
    },
    [TransitionStyleTypes.maxHeight]: {
      from: { maxHeight: "0px", opacity: 0 },
      enter: { maxHeight: maxheight || "100px", opacity: 1 },
      leave: { maxHeight: "0px", opacity: 0 },
    },
  };

  const transition = useTransition(inProp, {
    ...styles[style],
    config: { duration: transDuration },
  });

  return (
    <>
      {transition((style, item) =>
        item ? (
          <animated.div style={style} className={className ? className : ""}>
            {children}
          </animated.div>
        ) : (
          ""
        )
      )}
    </>
  );
};

export default TransitionProvider;
