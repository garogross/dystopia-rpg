import { getHexPoints } from "./getHexPoints";

export const getHexSvg = (
  size: number,
  color?: string,
  stroke?: string,
  strokeDasharray?: [number, number]
) => {
  const points = getHexPoints(size * 2);

  const lines = points.map((_, idx) => {
    const startIdx = idx;
    const endIdx = (idx + 1) % points.length;
    const [x1, y1] = points[startIdx];
    const [x2, y2] = points[endIdx];

    // Add stroke-dasharray for dashed lines
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${
      stroke || "black"
    }" stroke-width="2" stroke-linecap="round" ${
      strokeDasharray ? `stroke-dasharray="${strokeDasharray.join()}"` : ""
    } />`;
  });

  // calculate bounding box of hex points
  const xs = points.map(([x]) => x);
  const ys = points.map(([_, y]) => y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const width = maxX - minX;
  const height = maxY - minY;

  const polygon = color
    ? `<polygon points="${points
        .map(([x, y]) => `${x},${y}`)
        .join(" ")}" fill="${color}" fill-opacity="0.5"/>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${minX} ${minY} ${width} ${height}">${polygon}${lines.join(
    ""
  )}</svg>`;
};
