import _ from "lodash";
import { delete_, post, put, useFetch } from ".";
import { Book } from "./book";

export type Cart = {
  books: { book: Book; count: number }[];
  discount: number;
  total: number;
};

export function useCart() {
  const r = useFetch<Cart>("/cart");
  const cartCount =
    r.data !== undefined
      ? _(r.data.books)
          .map((b) => b.count)
          .sum()
      : 0;
  return {
    books: r.data?.books ?? [],
    discount: r.data?.discount ?? 0,
    total: r.data?.total ?? 0,
    cartCount,
    ...r,
  };
}

export function putCart(id: string) {
  return put(`/cart/${id}`);
}

export function deleteFromCart(id: string) {
  return delete_(`/cart/${id}`);
}

export function emptyCart() {
  return delete_("/cart");
}

export function checkout() {
  return post("/cart/checkout");
}
