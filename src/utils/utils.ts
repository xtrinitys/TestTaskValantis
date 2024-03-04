import {md5} from "js-md5";

export function hashText(content: string): string {
  const hash = md5.create();
  hash.update(content);
  return hash.hex();
}

export function getDateString(date: Date):string {
  return date.toISOString().split('T')[0].replaceAll('-', '');
}