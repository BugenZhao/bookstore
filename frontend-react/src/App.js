import { useState } from 'react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import _ from 'lodash';

import { CheckoutPage, DetailPage, HomePage, SearchPage, LoginPage } from "./pages";
import { StoreContext } from './services';


function App() {
  const [bookCount, setBookCount] = useState(100);
  const [cart, setCart] = useState([]);
  const addToCart = (id) => { setCart(cart.concat([id])); };

  return (
    <StoreContext.Provider value={[bookCount, setBookCount, cart, addToCart]}>
      <Router>
        <Switch>
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/detail/:id" component={DetailPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/search/:keyword?" component={SearchPage} />
          <Route path="/" component={LoginPage} />
        </Switch>
      </Router>
    </StoreContext.Provider>
  )
}

export default App;
