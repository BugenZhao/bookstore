import { Header } from "../components/Header";
import { Main } from "./common/Main";
import { Body } from "./common/Body";
import { BookManagementView } from "../views/BookManagementView";
import { UserManagementView } from "../views/UserManagementView";
import { Button, Tab, Tabs } from "react-bootstrap";
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

function ResetBooksButton() {
  const [rep, setRep] = useState(false);

  return (
    <Button
      size="lg"
      variant="outline-danger"
      className="align-self-center"
      onClick={() => {
        if (rep) {
          // setBOOKS(ALL_BOOKS);
        }
        setRep(!rep);
      }}
    >
      {rep ? "Click again to reset" : "Reset all books"}
    </Button>
  );
}

function DashboardMain() {
  const [key, setKey] = useState<string | undefined>("books");

  return (
    <div>
      <div className="d-flex justify-content-between">
        <span className="h1">Dashboard</span>
        {
          key === "books" ? <ResetBooksButton /> : null
          // <h4 className="align-self-center">
          //   <Badge bg="info">Demo</Badge>
          // </h4>
        }
      </div>
      <div className="py-4">
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k ?? undefined)}
          className="mb-3"
        >
          <Tab eventKey="books" title="Books">
            <BookManagementView />
          </Tab>
          <Tab eventKey="users" title="Users">
            <UserManagementView />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
