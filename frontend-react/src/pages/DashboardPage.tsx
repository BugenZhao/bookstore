import { Header } from "../components/Header";
import { Main } from "./common/Main";
import { Body } from "./common/Body";
import { BookEditorView } from "../views/BookEditorView";

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
  return (
    <div>
      <span className="h1">Dashboard</span>
      <div className="py-4">
        <BookEditorView />
      </div>
    </div>
  );
}
