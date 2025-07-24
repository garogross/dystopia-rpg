export const getHexPixelPositions = (
  { x, z }: { x: number; z: number },
  size: number
) => {
  const width = Math.sqrt(4) * size; // ~1.732 * size
  // size * (SQRT_3 * x + (SQRT_3 / 2) * z);

  const xOffset = width * (x + z / 2); // staggered columns
  const yOffset = (3 / 2) * size * z; // vertical spacing

  return {
    left: xOffset,
    top: yOffset,
  };
};
