import { useState } from 'react';
import { Route, Switch, HashRouter as Router, Redirect } from 'react-router-dom';
import _ from 'lodash';
import { useImmer } from "use-immer";

import { CheckoutPage, DetailPage, HomePage, SearchPage, LoginPage, DashboardPage } from "./pages";
import { BOOKS, BooksContext, StoreContext } from './services';


function App() {
  const [bookCount, setBookCount] = useState(100);
  const [cart, setCart] = useState([]);
  const addToCart = (id) => { setCart(cart.concat([id])); };

  const [books, updateBooks] = useImmer(BOOKS);

  return (
    <BooksContext.Provider value={[books, updateBooks]}>
      <StoreContext.Provider value={[bookCount, setBookCount, cart, addToCart]}>
        <Router>
          <Switch>
            <Route path="/checkout" component={CheckoutPage} />
            <Route path="/detail/:id" component={DetailPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/search/:keyword?" component={SearchPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route exact path="/"><Redirect to="/login" /></Route>
          </Switch>
        </Router>
      </StoreContext.Provider>
    </BooksContext.Provider>
  )
}

export default App;
