import { PagingRequest, PagingResponse, useFetch } from ".";
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

export function useBook(id: string) {
  const r = useFetch<Book>(`/books/id/${id}`);
  return {
    book: r.error ? undefined : r.data,
    ...r,
  };
}

export function useAllBooks(pageReq: PagingRequest) {
  const r = useFetch<PagingResponse<Book>>("/books/?" + encodeParams(pageReq));
  return {
    books: r.error ? undefined : r.data?.data,
    total: r.error ? undefined : r.data?.total,
    ...r,
  };
}

export function useSearchBooks(keyword: string, pageReq: PagingRequest) {
  const r = useFetch<PagingResponse<Book>>(
    `/books/search/${keyword}?` + encodeParams(pageReq)
  );
  return {
    books: r.error ? undefined : r.data?.data,
    total: r.error ? undefined : r.data?.total,
    ...r,
  };
}
