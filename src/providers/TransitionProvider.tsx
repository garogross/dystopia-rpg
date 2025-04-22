import { ReactNode } from "react";
import { animated, useTransition } from "react-spring";

export enum TransitionStyleTypes {
  opacity = "opacity",
  opacityLeave = "opacityLeave",
  right = "right",
  left = "left",
  top = "top",
  bottom = "bottom",
  zoomIn = "zoomIn",
}

interface TransitionProviderProps {
  style: TransitionStyleTypes;
  inProp: boolean;
  className?: string;
  duration?: number;
  delay?: number;
  isPicture?: boolean;
  children: ReactNode;
}
const TransitionProvider = ({
  style,
  inProp,
  className,
  duration,
  delay,
  children,
  isPicture,
}: TransitionProviderProps) => {
  const transDuration = duration ? duration : 500;
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

    [TransitionStyleTypes.right]: {
      from: { opacity: 0, translateX: "60px" },
      enter: { opacity: 1, translateX: "0%" },
      leave: { opacity: 0, translateX: "60px" },
    },
    [TransitionStyleTypes.left]: {
      from: { opacity: 0, translateX: "-60px" },
      enter: { opacity: 1, translateX: "0%" },
      leave: { opacity: 0, translateX: "-60px" },
    },
    [TransitionStyleTypes.top]: {
      from: { opacity: 0, translateY: "-60px" },
      enter: { opacity: 1, translateY: "0%" },
      leave: { opacity: 0, translateY: "-60px" },
    },
    [TransitionStyleTypes.bottom]: {
      from: { opacity: 0, translateY: "60px" },
      enter: { opacity: 1, translateY: "0%" },
      leave: { opacity: 0, translateY: "60px" },
    },
    [TransitionStyleTypes.zoomIn]: {
      from: { opacity: 0, scale: "0" },
      enter: { opacity: 1, scale: "1" },
      leave: { opacity: 0, scale: "0" },
    },
  };

  const transition = useTransition(inProp, {
    ...styles[style],
    trail: delay || 0,
    config: { duration: transDuration },
  });

  const Wrapper = isPicture ? animated.picture : animated.div;

  return (
    <>
      {transition((style, item) =>
        item ? (
          <Wrapper style={style} className={className ? className : ""}>
            {children}
          </Wrapper>
        ) : (
          ""
        )
      )}
    </>
  );
};

export default TransitionProvider;
