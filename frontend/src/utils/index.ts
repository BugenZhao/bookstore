import moment from "moment";

export function encodeParams(p: Record<string, any>) {
  return Object.entries(p)
    .map((kv) => kv.map(encodeURIComponent).join("="))
    .join("&");
}

export const defaultFrom = () => moment().subtract(moment.duration(7, "days"));
export const defaultTo = () => moment();
