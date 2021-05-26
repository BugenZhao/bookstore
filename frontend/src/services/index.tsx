
import useSWR, { SWRConfiguration } from "swr";
import { API_BASE } from "../config";

export type SelectContextType<T> = {
  selected: T;
  setSelected: (n: T) => void;
};

export function useFetch<Data>(
  path: string,
  config?: SWRConfiguration<Data, any>
) {
  const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw res;
    }
    return res.json();
  };
  const url = API_BASE + path;

  return useSWR<Data, any>(url, fetcher, config);
}

const headers = {
  "Content-type": "application/json; charset=UTF-8",
};

export function post(path: string, body?: BodyInit | null) {
  const url = API_BASE + path;
  return fetch(url, { method: "POST", body: body, headers: headers });
}

export function put(path: string, body?: BodyInit | null) {
  const url = API_BASE + path;
  return fetch(url, { method: "PUT", body: body, headers: headers });
}

export function delete_(path: string, body?: BodyInit | null) {
  const url = API_BASE + path;
  return fetch(url, { method: "DELETE", body: body, headers: headers });
}

export function patch(path: string, body?: BodyInit | null) {
  const url = API_BASE + path;
  return fetch(url, { method: "PATCH", body: body, headers: headers });
}
