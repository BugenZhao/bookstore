import { createContext, PropsWithChildren } from "react";
import _ from "lodash";
import _BOOKS from "../resources/books.json";
import useLocalStorage from "use-local-storage";
import { BookDict } from "./book";

type BooksContextType = {
  BOOKS: BookDict;
  setBOOKS: (d: BookDict) => void;
};
export const BooksContext = createContext<BooksContextType>(null!);

export const ALL_BOOKS: BookDict = _(_BOOKS).keyBy("id").value();

export function BooksProvider(props: PropsWithChildren<{}>) {
  const [BOOKS, setBOOKS] = useLocalStorage("bz-books", ALL_BOOKS);

  return (
    <BooksContext.Provider value={{ BOOKS, setBOOKS }}>
      {props.children}
    </BooksContext.Provider>
  );
}
