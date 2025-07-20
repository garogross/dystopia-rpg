import React from "react";
import { EHexDirections } from "../../../../constants/influence/EHexDirections";

interface Props {
  size: number;
  stroke?: (isBorder: boolean) => string | undefined;
  strokeDash?: (isBorder: boolean) => string | undefined;
  className?: string;
  borders: EHexDirections[] | undefined;
}

const directionToLine = {
  [EHexDirections.TopRight]: [0, 1],
  [EHexDirections.Right]: [1, 2],
  [EHexDirections.BottomRight]: [2, 3],
  [EHexDirections.BottomLeft]: [3, 4],
  [EHexDirections.Left]: [4, 5],
  [EHexDirections.TopLeft]: [5, 0],
};

const getHexPoints = (size: number) => {
  const r = size / 2;
  return [
    [r, 0], // top
    [size, size * 0.25], // top-right
    [size, size * 0.75], // bottom-right
    [r, size], // bottom
    [0, size * 0.75], // bottom-left
    [0, size * 0.25], // top-left
  ];
};

const InfluenceMapHexVector: React.FC<Props> = ({
  size,
  borders,
  className,
  stroke,
  strokeDash,
}) => {
  return (
    <svg
      className={className || ""}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {getHexPoints(size).map((_, idx, points) => {
        // Each side is from idx to (idx+1)%6
        const startIdx = idx;
        const endIdx = (idx + 1) % points.length;
        const [x1, y1] = points[startIdx];
        const [x2, y2] = points[endIdx];
        // Find direction key for this side
        // directionToLine: { [dir]: [startIdx, endIdx] }
        let isBorder = false;
        if (borders && borders.length > 0) {
          isBorder = borders.some((dir) => {
            const [dStart, dEnd] = directionToLine[dir];
            return (
              (dStart === startIdx && dEnd === endIdx) ||
              (dStart === endIdx && dEnd === startIdx)
            );
          });
        }
        return (
          <line
            key={idx}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={stroke?.(isBorder)}
            strokeDasharray={strokeDash?.(isBorder)}
            strokeWidth="2"
          />
        );
      })}
    </svg>
  );
};

export default InfluenceMapHexVector;
