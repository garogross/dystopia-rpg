import React, { FC, ReactNode, useEffect, useRef, useState } from "react";

export type OffsetType = {
  x: number;
  y: number;
};

interface Props {
  children: ReactNode;
  className?: string;
  onUpdateEnd?: (offset: OffsetType, scale: number) => void;
}

const DragAndZoomProvider: FC<Props> = ({
  children,
  className,
  onUpdateEnd,
}) => {
  const [dragging, setDragging] = useState(false);
  const [lastPosition, setLastPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [offset, setOffset] = useState<OffsetType>({
    x: 0,
    y: 0,
  });
  const [dragged, setDragged] = useState(false);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const scaleTimeout = useRef<NodeJS.Timeout | null>(null);
  const [pinchStartDistance, setPinchStartDistance] = useState<number | null>(
    null
  );
  const [pinchStartScale, setPinchStartScale] = useState<number>(1);

  const dragThreshold = 8; // px
  const minScale = 0.8;
  const maxScale = 1.5;
  const scaleStep = 0.1;

  useEffect(() => {
    const handleDragEnd = () => {
      setDragging(false);
      setLastPosition(null);
      onUpdateEnd?.(offset, scale);
    };

    window.addEventListener("mouseleave", handleDragEnd);
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchend", handleDragEnd);
    window.addEventListener("touchcancel", handleDragEnd);

    return () => {
      window.removeEventListener("mouseleave", handleDragEnd);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchend", handleDragEnd);
      window.removeEventListener("touchcancel", handleDragEnd);
    };
  }, [offset, scale, onUpdateEnd]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    let clientX: number, clientY: number;
    if ("touches" in e && e.touches.length === 1) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ("clientX" in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      return;
    }
    setDragging(true);
    setLastPosition({ x: clientX, y: clientY });
    setDragged(false);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging || !lastPosition) return;
    let clientX: number, clientY: number;
    if ("touches" in e && e.touches.length === 1) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ("clientX" in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      return;
    }
    const dx = clientX - lastPosition.x;
    const dy = clientY - lastPosition.y;
    if (
      !dragged &&
      (Math.abs(dx) > dragThreshold || Math.abs(dy) > dragThreshold)
    ) {
      setDragged(true);
    }
    setOffset((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));
    setLastPosition({ x: clientX, y: clientY });
  };

  const handleDragEnd = () => {
    setDragging(false);
    setLastPosition(null);
    onUpdateEnd?.(offset, scale);
  };

  // Prevent click after drag
  const handleClickCapture = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragged) {
      e.stopPropagation();
      if ("preventDefault" in e) e.preventDefault();
      setDragged(false); // reset for next interaction
    }
  };

  // Handle mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) return; // let browser handle pinch-to-zoom
    // e.preventDefault();
    let newScale = scale - Math.sign(e.deltaY) * scaleStep;
    newScale = Math.max(minScale, Math.min(maxScale, newScale));
    setScale(newScale);
    // Debounce onUpdateEnd for scaling
    if (scaleTimeout.current) clearTimeout(scaleTimeout.current);
    scaleTimeout.current = setTimeout(() => {
      onUpdateEnd?.(offset, newScale);
    }, 150);
  };

  const getTouchDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch start
      const distance = getTouchDistance(e.touches);
      setPinchStartDistance(distance);
      setPinchStartScale(scale);
    } else if (e.touches.length === 1) {
      handleDragStart(e);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchStartDistance !== null) {
      e.preventDefault(); // Prevent browser zoom
      const distance = getTouchDistance(e.touches);
      let newScale = pinchStartScale * (distance / pinchStartDistance);
      newScale = Math.max(minScale, Math.min(maxScale, newScale));
      setScale(newScale);
      // Debounce onUpdateEnd for scaling
      if (scaleTimeout.current) clearTimeout(scaleTimeout.current);
      scaleTimeout.current = setTimeout(() => {
        onUpdateEnd?.(offset, newScale);
      }, 150);
    } else if (e.touches.length === 1 && !pinchStartDistance) {
      handleMove(e);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setPinchStartDistance(null);
    setPinchStartScale(1);
    if (e.touches.length === 0) {
      handleDragEnd();
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
        transformOrigin: "0 0",
      }}
      className={className}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onMouseDown={handleDragStart}
      onMouseMove={handleMove}
      onMouseUp={handleDragEnd}
      onClickCapture={handleClickCapture}
      onWheel={handleWheel}
    >
      {children}
    </div>
  );
};

export default DragAndZoomProvider;
