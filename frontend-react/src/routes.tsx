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
import { ADMINS, useStore } from "./services";

export function BSRoutes() {
  const { user } = useStore();
  const isSignedIn = user !== "";
  const isAdmin = ADMINS.includes(user);

  console.log({ isSignedIn, isAdmin, user });

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
            <Route>
              <Redirect to="/home" />
            </Route>
          </>
        ) : (
          <Route>
            <Redirect to="/login" />
          </Route>
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
