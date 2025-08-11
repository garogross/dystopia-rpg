export const getHexPoints = (
  size: number,
  borderWidth: number = 0
): [number, number][] => {
  const r = size / 2;
  return [
    [r, borderWidth] as [number, number], // top
    [size - borderWidth, size * 0.25] as [number, number], // top-right
    [size - borderWidth, size * 0.75] as [number, number], // bottom-right
    [r, size - borderWidth] as [number, number], // bottom
    [borderWidth, size * 0.75] as [number, number], // bottom-left
    [borderWidth, size * 0.25] as [number, number], // top-left
  ];
};
