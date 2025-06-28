import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NewPortalProvider from "./NewPortalProvider";
import Backdrop from "../components/layout/Backdrop/Backdrop";
import {
  CYBERFARM_TUTORIAL_PROGRESS,
  ECyberfarmTutorialActions,
} from "../constants/cyberfarm/tutorial";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { updateTutorialProgress } from "../store/slices/cyberFarm/tutorialSlice";
import { TargetArrowIcon } from "../components/layout/icons/TutorialPopup";

interface Props {
  id: ECyberfarmTutorialActions;
  onClick: () => void | Promise<void>;
  targetFromTop?: boolean;
}

const CloneFixedElementProvider: React.FC<Props> = ({
  id,
  onClick,
  targetFromTop,
}) => {
  const dispatch = useAppDispatch();
  const [clone, setClone] = useState<HTMLElement | null>(null);
  const [linkProps, setLinkProps] = useState<{
    to: string;
    content: React.ReactNode;
    className: string;
  } | null>(null);
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tutorialInProgress = useAppSelector(
    (state) => state.cyberfarm.tutorial.tutorialInProgress
  );
  const tutorialProgressIndex = useAppSelector(
    (state) => state.cyberfarm.tutorial.tutorialProgressIndex
  );

  const curProgress = CYBERFARM_TUTORIAL_PROGRESS[tutorialProgressIndex];

  const show =
    tutorialInProgress &&
    curProgress.action === id &&
    (!!clone || !!linkProps) &&
    gameInited;

  useLayoutEffect(() => {
    const timeOut = setTimeout(() => {
      if (!gameInited) return;
      const original = document.getElementById(id);

      if (!original) {
        console.warn(`Element with ID "${id}" not found.`);
        setClone(null);
        setLinkProps(null);
        return;
      }

      if (original.tagName.toLowerCase() === "a") {
        // If it's a link, extract href and content
        const href =
          (original as HTMLAnchorElement).getAttribute("href") || "#";
        const className = original.className || "";
        // Try to get the React children or fallback to innerHTML
        const content = original.innerHTML;
        setLinkProps({
          to: href,
          content: <span dangerouslySetInnerHTML={{ __html: content }} />,
          className,
        });
        setClone(null);
      } else {
        const rect = original.getBoundingClientRect();
        const clonedNode = original.cloneNode(true) as HTMLElement;
        clonedNode.style.margin = "0";
        clonedNode.style.width = `${rect.width}px`;
        clonedNode.style.height = `${rect.height}px`;

        setClone(clonedNode);
        setLinkProps(null);
      }
    }, 500);

    // Cleanup
    return () => {
      setClone(null);
      setLinkProps(null);
      clearTimeout(timeOut);
    };
  }, [id, gameInited]);

  useEffect(() => {
    if (!show) return;
    if (clone && wrapperRef.current) {
      wrapperRef.current.appendChild(clone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clone, show]);

  const onClickItem = async () => {
    await onClick();
    dispatch(updateTutorialProgress());
  };

  // The wrapper div gets the fixed positioning
  const original =
    typeof window !== "undefined" ? document.getElementById(id) : null;
  const rect = original
    ? original.getBoundingClientRect()
    : { top: 0, left: 0, width: 0, height: 0 };

  return (
    <NewPortalProvider>
      <Backdrop inProp={show} onClose={() => {}} highZIndex />
      {show && (
        <div
          onClick={onClickItem}
          ref={wrapperRef}
          style={{
            position: "fixed",
            zIndex: 999999,
            top: `${rect.top}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
          }}
        >
          <div
            style={{
              position: "absolute",
              zIndex: 999999,
              bottom: -2,
              transform: `translateY(100%)`,
              right: 0,
            }}
          >
            <TargetArrowIcon />
          </div>
          {linkProps && (
            <Link
              className={linkProps.className}
              to={linkProps.to}
              style={{ display: "block", width: "100%", height: "100%" }}
            >
              {linkProps.content}
            </Link>
          )}
          {/* The cloned element will be appended here if not a link */}
        </div>
      )}
    </NewPortalProvider>
  );
};

export default CloneFixedElementProvider;
