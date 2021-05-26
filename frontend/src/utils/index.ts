import moment, { duration } from "moment";

export function encodeParams(p: Record<string, any>) {
  return Object.entries(p)
    .map((kv) => kv.map(encodeURIComponent).join("="))
    .join("&");
}

export const defaultFrom = () => moment().subtract(duration(7, "days"));
export const defaultTo = () => moment();
