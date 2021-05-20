import { patch, useFetch } from ".";
import { UserType } from "./auth";

export type User = {
  id: string;
  username: string;
  email: string;
  type: UserType;
  banned: boolean;
};

export function useUsers() {
  const r = useFetch<Record<string, User>>("/admin/users/", {
  });
  return {
    users: r.error ? undefined : r.data,
    ...r,
  };
}

export function patchUser(id: string, data: Partial<User>) {
  return patch(`/admin/users/${id}`, JSON.stringify(data));
}
