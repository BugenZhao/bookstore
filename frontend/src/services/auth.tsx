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
  password: string;
};

export function postRegister(data: RegisterData) {
  return post("/users/register", JSON.stringify(data));
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