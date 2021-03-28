import { createContext } from 'react';
import _ from 'lodash';
import _BOOKS from '../resources/books.json';

type StoreContextType = {
  cart: number[],
  addToCart: (id: number) => void,
  setCart: (newCart: number[]) => void,
}
export const StoreContext = createContext<StoreContextType>(null!);

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
