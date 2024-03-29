import { Header } from "../components/Header";
import { Main } from "./common/Main";
import { Body } from "./common/Body";
import { BookManagementView } from "../views/BookManagementView";
import { UserManagementView } from "../views/UserManagementView";
import { OrderManagementView } from "../views/OrderManagementView";
import { Tab, Tabs } from "react-bootstrap";
import { useRouteMatch } from "react-router";
import { DashboardPageParams } from "../routes";
import { useHistory } from "react-router-dom";
import { SalesView } from "../views/SalesView";
import { UserSpendingsView } from "../views/UserSpendingsView";

export function DashboardPage() {
  return (
    <Body>
      <Header active="dashboard" />
      <Main>
        <DashboardMain />
      </Main>
    </Body>
  );
}

function DashboardMain() {
  const tab = useRouteMatch<DashboardPageParams>().params.tab ?? "books";
  const history = useHistory();

  return (
    <div>
      <div className="h1 mb-4">Dashboard</div>
      <Tabs
        activeKey={tab}
        onSelect={(k) => {
          const tab = k ?? "books";
          history.replace(`/dashboard/${tab}`);
        }}
        className="mb-3"
      >
        <Tab eventKey="books" title="Books">
          <BookManagementView />
        </Tab>
        <Tab eventKey="users" title="Users">
          <UserManagementView />
        </Tab>
        <Tab eventKey="orders" title="Orders">
          <OrderManagementView />
        </Tab>
        <Tab eventKey="sales" title="Sales">
          <SalesView />
        </Tab>
        <Tab eventKey="spendings" title="User Spendings">
          <UserSpendingsView />
        </Tab>
      </Tabs>
    </div>
  );
}
