import _ from "lodash";
import { put, useFetch } from ".";

export type Cart = Record<string, number>;

export function useCart() {
  const r = useFetch<Cart>("/cart");
  const cartCount = r.data !== undefined ? _(r.data).values().sum() : 0;
  return {
    cart: r.data ?? {},
    cartCount,
    ...r,
  };
}

export function putCart(id: string) {
  return put(`/cart/${id}`);
}
