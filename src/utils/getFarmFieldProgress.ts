export const getFarmFieldProgress = (startDate: number, endDate: number) => {
  let progress =
    ((Date.now() - new Date(startDate).getTime()) /
      (new Date(endDate).getTime() - new Date(startDate).getTime())) *
    100;

  if(progress > 100) progress = 100;
  
  const remainingTimeInSecs = Math.max(
    0,
    Math.floor((new Date(endDate).getTime() - Date.now()) / 1000)
  );

  return { progress, remainingTimeInSecs };
}