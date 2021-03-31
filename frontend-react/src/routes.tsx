import {
  Route,
  Switch,
  HashRouter as Router,
  Redirect,
} from "react-router-dom";
import {
  CheckoutPage,
  DetailPage,
  HomePage,
  SearchPage,
  LoginPage,
  DashboardPage,
} from "./pages";
import { useStore } from "./services/StoreContext";

export function BSRoutes() {
  const { isSignedIn, isAdmin } = useStore();
  console.log({ isSignedIn, isAdmin });

  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        {isSignedIn ? (
          <>
            <Route path="/checkout" component={CheckoutPage} />
            <Route path="/detail/:id" component={DetailPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/search/:keyword?" component={SearchPage} />
            {isAdmin ? (
              <Route path="/dashboard" component={DashboardPage} />
            ) : null}
            <Redirect exact path="/" to="/home" />
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </Router>
  );
}

export type DetailPageParams = {
  id: string;
};

export type SearchPageParams = {
  keyword?: string;
};
