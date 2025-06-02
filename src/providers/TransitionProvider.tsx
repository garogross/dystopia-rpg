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
  zoomOut = "zoomOut",
  zoomInOut = "zoomInOut",
  height = "height",
}

interface TransitionProviderProps {
  style: TransitionStyleTypes;
  inProp: boolean;
  className?: string;
  duration?: number;
  delay?: number;
  isPicture?: boolean;
  children: ReactNode;
  height?: number;
}
const TransitionProvider = ({
  style,
  inProp,
  className,
  duration,
  delay,
  children,
  isPicture,
  height,
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
    [TransitionStyleTypes.zoomOut]: {
      from: { opacity: 1, scale: "2" },
      enter: { opacity: 1, scale: "1" },
      leave: { opacity: 0, scale: "2" },
    },
    [TransitionStyleTypes.zoomInOut]: {
      from: { opacity: 0, scale: "2" },
      enter: { opacity: 1, scale: "1" },
      leave: { opacity: 0, scale: "0" },
    },
    [TransitionStyleTypes.height]: {
      from: { maxHeight: 0, opacity: 0 },
      enter: { maxHeight: height || 100, opacity: 1 },
      leave: { maxHeight: 0, opacity: 0 },
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
