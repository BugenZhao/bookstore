import { useFetch } from ".";

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
    book: r.data,
    ...r,
  };
}

export function useBooks() {
  const r = useFetch<BookDict>(`/books/`);
  return {
    books: r.data,
    ...r,
  };
}
