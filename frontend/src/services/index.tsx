import useSWR from "swr";
import { API_BASE } from "../config";

export type SelectContextType<T> = {
  selected: T;
  setSelected: (n: T) => void;
};

export function useFetch<Data>(path: string) {
  const fetcher = (url: string) =>
    fetch(url, { credentials: "include" }).then((res) => res.json());
  const url = API_BASE + path;

  return useSWR<Data, any>(url, fetcher);
}

export function post(path: string, body?: BodyInit | null) {
  const url = API_BASE + path;

  return fetch(url, { method: "POST", body: body, credentials: "include" });
}

export enum UserType {
  admin = 0,
  normal = 1,
}

export type AuthedUser = {
  username: string;
  user_type: UserType;
};

export function useUser() {
  const r = useFetch<AuthedUser>("/users/check");
  const isAdmin = r.data ? r.data.user_type === UserType.admin : undefined;
  return {
    isAdmin,
    ...r,
  };
}
