export const formatTime = (timeInSec: number): string => {
  const SECONDS_IN_HOUR = 3600;
  const SECONDS_IN_MINUTE = 60;

  const hours = Math.floor(timeInSec / SECONDS_IN_HOUR);
  const minutes = Math.floor((timeInSec % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
  const seconds = timeInSec % SECONDS_IN_MINUTE;

  const padNumber = (num: number): string =>
    num.toFixed().toString().padStart(2, "0");

  return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
};
