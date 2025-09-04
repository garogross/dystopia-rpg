export const getAngle = (
  clientX: number,
  clientY: number,
  gunCenterX: number,
  gunCenterY: number
) => {
  const deltaX = clientX - gunCenterX;
  const deltaY = clientY - gunCenterY;
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

  // Convert to degrees and adjust for gun's natural orientation
  // Assuming the gun points right by default (0 degrees)
  let adjustedAngle = angle + 90;

  // Limit rotation to reasonable bounds (e.g., -45 to 45 degrees)
  adjustedAngle = Math.max(-45, Math.min(45, adjustedAngle));
  return adjustedAngle;
};
