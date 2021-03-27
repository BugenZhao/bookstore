import { createContext } from 'react';
import _ from 'lodash';
import _BOOKS from '../resources/books.json';

export const BOOKS = _(_BOOKS).keyBy("id").value();

export const StoreContext = createContext(null);
export const BooksContext = createContext(null);
