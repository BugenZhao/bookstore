import { Header } from "../components/Header";
import { Main } from "./common/Main";
import { Body } from "./common/Body";
import { BookManagementView } from "../views/BookManagementView";
import { UserManagementView } from "../views/UserManagementView";
import { OrderManagementView } from "../views/OrderManagementView";
import { Tab, Tabs } from "react-bootstrap";
import { useState } from "react";

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
  const [key, setKey] = useState<string>("books");

  return (
    <div>
      <div className="d-flex justify-content-between">
        <span className="h1">Dashboard</span>
      </div>
      <div className="py-4">
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k ?? "books")}
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
        </Tabs>
      </div>
    </div>
  );
}
