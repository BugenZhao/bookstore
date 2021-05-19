import { useFetch } from ".";
import { Cart } from "./cart";

export enum OrderStatus {
  submitted = "submitted",
  shipped = "shipped",
  delivered = "delivered",
  cancelled = "cancelled",
}

export type Order = {
  id: string;
  datetime: string;
  cart: Cart;
  consignee: string;
  status: OrderStatus;
};

export function useOrders() {
  const r = useFetch<Order[]>("/orders/");
  return {
    orders: (r.error ? undefined : r.data) ?? [],
    ...r,
  };
}
