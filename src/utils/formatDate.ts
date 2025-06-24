export const formatDate = (d: number): string => {
  const date = new Date(d);
  const padNumber = (num: number): string => num.toString().padStart(2, "0");

  const day = padNumber(date.getDate());
  const month = padNumber(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};
