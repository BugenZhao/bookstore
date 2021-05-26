import { Moment } from "moment";
import { useFetch } from ".";
import { encodeParams } from "../utils";
import { User } from "./admin";
import { Book } from "./book";

export enum OrderStatus {
  submitted = "submitted",
  shipped = "shipped",
  delivered = "delivered",
  cancelled = "cancelled",
}

export type Order = {
  id: string;
  user?: User;
  createdAt: string;
  consignee: string;
  status: OrderStatus;
  items: {
    book: Book;
    quantity: number;
  }[];
  totalPrice: number;
};

export function useOrders() {
  const r = useFetch<Order[]>("/orders/");
  return {
    orders: (r.error ? undefined : r.data) ?? [],
    ...r,
  };
}

export type OrdersSummary = {
  books: {
    book: Book;
    count: number;
  }[];
  total: number;
};

export function useOrdersSummary(
  from: Moment | undefined,
  to: Moment | undefined
) {
  const r = useFetch<OrdersSummary>(
    "/stat/summary?" +
      encodeParams({
        from: from?.toISOString(),
        to: to?.toISOString(),
      })
  );
  return {
    summary: r.error ? undefined : r.data,
    ...r,
  };
}
