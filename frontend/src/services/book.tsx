import { PagingResponse, useFetch } from ".";
import { encodeParams } from "../utils";

export type Book = {
  id: number;
  isbn: string;
  name: string;
  type: string;
  author: string;
  price: number;
  description: string;
  inventory: number;
  image: string;
};

export type BookDict = Record<string, Book>;

export function useBook(id: string) {
  const r = useFetch<Book>(`/books/${id}`);
  return {
    book: r.error ? undefined : r.data,
    ...r,
  };
}

export function useBooks(page: number, size: number) {
  const r = useFetch<PagingResponse<Book>>(
    "/books/?" +
      encodeParams({
        page,
        size,
      })
  );
  return {
    books: r.error ? undefined : r.data?.data,
    total: r.error ? undefined : r.data?.total,
    ...r,
  };
}
