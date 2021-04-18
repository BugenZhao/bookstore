import useSWR from "swr";
import { API_BASE } from "../config";

export type SelectContextType<T> = {
  selected: T;
  setSelected: (n: T) => void;
};

export function useFetch<Data>(path: string) {
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
  const url = API_BASE + path;

  const { data, error } = useSWR<Data, any>(url, fetcher);
  return { data, error };
}
