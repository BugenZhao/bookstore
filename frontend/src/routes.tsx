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
import { useUser } from "./services/auth";

function SignedInRoute(props: PropsWithChildren<RouteProps>) {
  const { error } = useUser();
  if (error) {
    return <Redirect to="/login" />;
  } else {
    return <Route {...props}>{props.children}</Route>;
  }
}

function AdminRoute(props: PropsWithChildren<RouteProps>) {
  const isAdmin = useUser().isAdmin ?? true;
  if (isAdmin) {
    return <Route {...props}>{props.children}</Route>;
  } else {
    return <Redirect to="/home" />;
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
        <SignedInRoute path="/orders" component={OrdersPage} />
        <AdminRoute path="/dashboard" component={DashboardPage} />
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
