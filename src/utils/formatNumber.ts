export function formatNumber(n: number, fix?: number) {
  let number = +(+n)?.toFixed(fix || 2);

  if (!n) {
    return 0;
  }

  if (number >= 1000000000) {
    const formattedNumber = (number / 1000000000).toFixed(1);
    return formattedNumber.replace(".", ",") + "B";
  } else if (number >= 1000000) {
    const formattedNumber = (number / 1000000).toFixed(1);
    return formattedNumber.replace(".", ",") + "M";
  } else if (number >= 1000) {
    const formattedNumber = (number / 1000).toFixed(1);
    return formattedNumber.replace(".", ",") + "K";
  }

  return number.toString();
}
