import { useFetch } from ".";
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
