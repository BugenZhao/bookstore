import { createContext, useState } from 'react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import _ from 'lodash';
import _BOOKS from './resources/books.json';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { DetailPage } from './pages/DetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { LoginPage } from './pages/LoginPage';

export const BOOKS = _(_BOOKS).keyBy("id").value();
export const BookContext = createContext([]);

function App() {
  const [bookCount, setBookCount] = useState(8);
  const [cart, setCart] = useState([]);
  const addToCart = (id) => { setCart(cart.concat([id])); };

  return (
    <BookContext.Provider value={[bookCount, setBookCount, cart, addToCart]}>
      <Router>
        <Switch>
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/detail/:id" component={DetailPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/search/:keyword?" component={SearchPage} />
          <Route path="/" component={LoginPage} />
        </Switch>
      </Router>
    </BookContext.Provider>
  )
}

export function Body(props) {
  return (
    <div className="store-home">
      {props.children}
    </div>
  )
}

export function Main({
  py: py_ = 4,
  children,
}) {
  const py = `py-${py_}`

  return (
    <main className={`${py} container`}>
      {children}
    </main>
  )
}


export default App;
