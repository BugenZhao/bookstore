import { Route, Switch, HashRouter as Router, Redirect } from 'react-router-dom';
import { CheckoutPage, DetailPage, HomePage, SearchPage, LoginPage, DashboardPage } from "./pages";


export function BSRoutes() {
  return (
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
  );
}

export type DetailPageParams = {
  id: string
};

export type SearchPageParams = {
  keyword?: string
};
