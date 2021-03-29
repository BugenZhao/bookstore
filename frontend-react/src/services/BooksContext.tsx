import { createContext, PropsWithChildren } from "react";
import _ from "lodash";
import _BOOKS from "../resources/books.json";
import useLocalStorage from "use-local-storage";

export const ALL_BOOKS = _(_BOOKS).keyBy("id").value();
type BooksContextType = {
  BOOKS: typeof ALL_BOOKS;
  setBOOKS: (d: typeof ALL_BOOKS) => void;
};
export const BooksContext = createContext<BooksContextType>(null!);

export type Book = typeof _BOOKS[0];

export function BooksProvider(props: PropsWithChildren<{}>) {
  const [BOOKS, setBOOKS] = useLocalStorage("bz-books", ALL_BOOKS);

  return (
    <BooksContext.Provider value={{ BOOKS, setBOOKS }}>
      {props.children}
    </BooksContext.Provider>
  );
}
