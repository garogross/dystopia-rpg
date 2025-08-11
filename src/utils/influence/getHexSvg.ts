import { getHexPoints } from "./getHexPoints";

export const getHexSvg = (size: number) => {
  const points = getHexPoints(size * 2);

  const lines = points.map((_, idx) => {
    const startIdx = idx;
    const endIdx = (idx + 1) % points.length;
    const [x1, y1] = points[startIdx];
    const [x2, y2] = points[endIdx];

    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="2" stroke-linecap="round" />`;
  });

  const width = size * 2 - 30;
  const height = size * 2 - 30;

  return `<svg xmlns="http://www.w3.org/2000/svg"    width="${width}" height="${height}">${lines.join(
    ""
  )}</svg>`;
};
