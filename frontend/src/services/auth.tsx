import { post, useFetch } from ".";

export type LoginData = {
  username: string;
  password: string;
};

export function postLogin(data: LoginData) {
  return post("/users/login", JSON.stringify(data));
}

export function postLogout() {
  return post("/users/logout");
}

export type RegisterData = {
  username: string;
  email: string;
  password: string;
};

export function postRegister(data: RegisterData) {
  return post("/users/register", JSON.stringify(data));
}

export enum UserType {
  admin = "admin",
  normal = "normal",
}

export type AuthedUser = {
  user_id: number;
  username: string;
  user_type: UserType;
};

export function useAuth() {
  const r = useFetch<AuthedUser>("/users/check", { refreshInterval: 10000 });
  const isAdmin =
    r.data && !r.error ? r.data.user_type === UserType.admin : undefined;
  return {
    isAdmin,
    ...r,
  };
}
