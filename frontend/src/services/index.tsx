import useSWR from "swr";
import { API_BASE } from "../config";

export type SelectContextType<T> = {
  selected: T;
  setSelected: (n: T) => void;
};

export function useFetch<Data>(path: string) {
  const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw res.json();
    }
    return res.json();
  };
  const url = API_BASE + path;

  return useSWR<Data, any>(url, fetcher);
}

export function post(path: string, body?: BodyInit | null) {
  const url = API_BASE + path;
  return fetch(url, { method: "POST", body: body });
}

export function put(path: string, body?: BodyInit | null) {
  const url = API_BASE + path;
  return fetch(url, { method: "PUT", body: body });
}

export function delete_(path: string, body?: BodyInit | null) {
  const url = API_BASE + path;
  return fetch(url, { method: "DELETE", body: body });
}
