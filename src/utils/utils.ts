import { md5 } from "js-md5";

export function removeDuplicateObjects<T>(objects: T[], field: keyof T): T[] {
  const uniqueValues = new Set<any>();

  return objects.filter((obj) => {
    const value = obj[field];
    if (!uniqueValues.has(value)) {
      uniqueValues.add(value);
      return true;
    }
    return false;
  });
}

export function hashText(content: string): string {
  const hash = md5.create();
  hash.update(content);
  return hash.hex();
}

export function isNumeric(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function getDateString(date: Date): string {
  return date.toISOString().split("T")[0].replaceAll("-", "");
}

export const isObjEmpty = (obj: Object): boolean =>
  Object.values(obj).every((x) => x === null || x === "");

export const capitalizeWord = (word: string) => {
  const lowerCase = word.toLowerCase();
  return lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
};
