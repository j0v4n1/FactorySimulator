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

export const convertDistance = (distance: string): string => {
  switch (distance) {
    case "Близко":
      return "near";
    case "Средняя удалённость":
      return "medium";
    case "Далеко":
      return "far";
    default:
      throw new Error("Неизвестная удалённость");
  }
};

export const convertReverseDistance = (distance: string): string => {
  switch (distance) {
    case "near":
      return "Близко";
    case "medium":
      return "Средняя удалённость";
    case "far":
      return "Далеко";
    default:
      throw new Error("Неизвестная удалённость");
  }
};
