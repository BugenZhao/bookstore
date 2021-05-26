import { PropsWithChildren } from "react";
import {
  Route,
  Switch,
  HashRouter as Router,
  Redirect,
  RouteProps,
} from "react-router-dom";
import {
  CheckoutPage,
  DetailPage,
  HomePage,
  SearchPage,
  DashboardPage,
  LoginPage,
  RegisterPage,
  OrdersPage,
} from "./pages";
import { useAuth } from "./services/auth";

function SignedInRoute(props: PropsWithChildren<RouteProps>) {
  const { error } = useAuth();
  if (error) {
    return <Redirect to="/login" />;
  } else {
    return <Route {...props}>{props.children}</Route>;
  }
}

function AdminRoute(props: PropsWithChildren<RouteProps>) {
  const { isAdmin, error } = useAuth();
  if (error || isAdmin === false) {
    return <Redirect to="/home" />;
  } else {
    return <Route {...props}>{props.children}</Route>;
  }
}

export function BSRoutes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <SignedInRoute path="/checkout" component={CheckoutPage} />
        <SignedInRoute path="/detail/:id" component={DetailPage} />
        <SignedInRoute path="/home" component={HomePage} />
        <SignedInRoute path="/search/:keyword?" component={SearchPage} />
        <SignedInRoute path="/orders/:tab?" component={OrdersPage} />
        <AdminRoute path="/dashboard/:tab?" component={DashboardPage} />
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

export type DashboardPageParams = {
  tab?: string;
};

export type OrdersPageParams = {
  tab?: string;
};
