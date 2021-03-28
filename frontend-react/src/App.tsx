import { useState } from 'react';
import { Route, Switch, HashRouter as Router, Redirect } from 'react-router-dom';
import { useImmer } from "use-immer";

import { CheckoutPage, DetailPage, HomePage, SearchPage, LoginPage, DashboardPage } from "./pages";
import { ALL_BOOKS, BooksContext, StoreContext } from './services';


function App() {
  const [cart, setCart] = useState([] as number[]);
  const addToCart = (id: number) => { setCart(cart.concat([id])); };

  const [BOOKS, updateBOOKS] = useImmer(ALL_BOOKS);

  return (
    <BooksContext.Provider value={{ BOOKS, updateBOOKS }}>
      <StoreContext.Provider value={{ cart, addToCart, setCart }}>
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
