export function convertNumToLocale(num: number) {
  return num.toLocaleString();
}

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value);

export const capitalizeFirst = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
