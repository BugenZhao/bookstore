import { Header } from "../components/Header";
import { Main } from "./common/Main";
import { Body } from "./common/Body";
import { BookEditorView } from "../views/BookEditorView";
import { UserManagementView } from "../views/UserManagementView";
import { Button, Tab, Tabs, Row, Col, Nav } from "react-bootstrap";
import { useContext, useState } from "react";
import { ALL_BOOKS, BooksContext } from "../services/BooksContext";

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
  const { setBOOKS } = useContext(BooksContext);
  const [rep, setRep] = useState(false);

  return (
    <Button
      size="lg"
      variant="outline-danger"
      className="align-self-center"
      onClick={() => {
        if (rep) {
          setBOOKS(ALL_BOOKS);
        }
        setRep(!rep);
      }}
    >
      {rep ? "Click again to reset" : "Reset all books"}
    </Button>
  );
}

function DashboardMain() {
  return (
    <div>
      <div className="d-flex justify-content-between">
        <span className="h1">Dashboard</span>
        <ResetBooksButton />
      </div>
      <div className="py-4">
        <Tabs defaultActiveKey="books" className="mb-3">
          <Tab eventKey="books" title="Books">
            <BookEditorView />
          </Tab>
          <Tab eventKey="users" title="Users">
            <UserManagementView />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
