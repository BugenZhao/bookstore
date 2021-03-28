import { createContext, useContext } from 'react';
import _ from 'lodash';
import _BOOKS from '../resources/books.json';

type StoreContextType = {
  cart: string[],
  addToCart: (id: string) => void,
  setCart: (newCart: string[]) => void,
}
export const StoreContext = createContext<StoreContextType>(null!);
export function useStore() {
  return useContext(StoreContext);
}


export const ALL_BOOKS = _(_BOOKS).keyBy("id").value();
type BooksContextType = {
  BOOKS: typeof ALL_BOOKS,
  updateBOOKS: (c: (d: typeof ALL_BOOKS) => void) => void,
}
export const BooksContext = createContext<BooksContextType>(null!);

export type Book = typeof _BOOKS[0];


export type SelectContextType<T> = {
  selected: T,
  setSelected: (n: T) => void,
};

