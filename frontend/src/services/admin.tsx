import { Moment } from "moment";
import {
  delete_,
  PageRequest,
  PageResponse,
  patch,
  put,
  useFetch,
} from ".";
import { encodeParams } from "../utils";
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

export function useAllUsers(pageReq: PageRequest) {
  const r = useFetch<PageResponse<User>>(
    "/admin/users/?" + encodeParams(pageReq)
  );
  return {
    users: r.error ? undefined : r.data?.data,
    total: r.error ? undefined : r.data?.total,
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

export function useAllOrders(pageReq: PageRequest) {
  const r = useFetch<PageResponse<Order>>(
    "/admin/orders/?" + encodeParams(pageReq)
  );
  return {
    orders: r.error ? undefined : r.data?.data,
    total: r.error ? undefined : r.data?.total,
    ...r,
  };
}

export type Sales = {
  book: Book;
  count: number;
}[];

export function useSales(from: Moment | undefined, to: Moment | undefined) {
  const r = useFetch<Sales>(
    "/admin/stat/sales?" +
      encodeParams({
        from: from?.toISOString(),
        to: to?.toISOString(),
      })
  );
  return {
    sales: r.error ? undefined : r.data,
    ...r,
  };
}

export type UserSpendings = {
  user: User;
  spending: number;
}[];

export function useUserSpendings(
  from: Moment | undefined,
  to: Moment | undefined
) {
  const r = useFetch<UserSpendings>(
    "/admin/stat/spendings?" +
      encodeParams({
        from: from?.toISOString(),
        to: to?.toISOString(),
      })
  );
  return {
    userSpendings: r.error ? undefined : r.data,
    ...r,
  };
}
