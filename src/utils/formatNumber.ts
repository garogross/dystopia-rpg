export function formatNumber(n: number, fix?: number, minVal10K?: boolean) {
  let number = +(+n)?.toFixed(fix || 2);

  if (!n) {
    return 0;
  }

  // If minVal10K is true, only format numbers >= 10,000
  if (number >= 1000000000) {
    const formattedNumber = (number / 1000000000).toFixed(1);
    return formattedNumber.replace(".", ",") + "B";
  } else if (number >= 1000000) {
    const formattedNumber = (number / 1000000).toFixed(1);
    return formattedNumber.replace(".", ",") + "M";
  } else if (number >= (minVal10K ? 10000 : 1000)) {
    const formattedNumber = (number / 1000).toFixed(1);
    return formattedNumber.replace(".", ",") + "K";
  }
  // For numbers less than 10,000, return as is
  return number.toString();
}
