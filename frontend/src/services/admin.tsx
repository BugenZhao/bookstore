import { useFetch } from ".";
import { UserType } from "./auth";

export type User = {
  id: number;
  username: string;
  email: string;
  type: UserType;
  banned: boolean;
};

export function useUsers() {
  const r = useFetch<Record<number, User>>("/admin/users/");
  return {
    users: r.error ? undefined : r.data,
    ...r,
  };
}
