import { delete_, patch, put, useFetch } from ".";
import { UserType } from "./auth";
import { Book } from "./book";
import { Order } from "./order";

export type User = {
  id: string;
  username: string;
  email: string;
  type: UserType;
  banned: boolean;
};

export function useAllUsers() {
  const r = useFetch<Record<string, User>>("/admin/users/");
  return {
    users: r.error ? undefined : r.data,
    ...r,
  };
}

export function patchUser(id: string, data: Partial<User>) {
  return patch(`/admin/users/${id}`, JSON.stringify(data));
}

export function patchBook(id: string, data: Partial<Book>) {
  return patch(`/admin/books/${id}`, JSON.stringify(data));
}

export function putBook(data: Partial<Book>) {
  return put(`/admin/books/`, JSON.stringify(data));
}

export function deleteBook(id: string) {
  return delete_(`/admin/books/${id}`);
}

export function useAllOrders() {
  const r = useFetch<Order[]>("/admin/orders/");
  return {
    orders: (r.error ? undefined : r.data) ?? [],
    ...r,
  };
}
