import { Header } from "../components/Header";
import { BooksView } from "../views/BooksView";
import { Main } from "./common/Main";
import { Body } from "./common/Body";
import { useRouteMatch } from "react-router";
import { HomeOrSearchPageParams } from "../routes";

export function SearchPage() {
  return (
    <Body>
      <Header active="search" />
      <Main>
        <SearchMain />
      </Main>
    </Body>
  );
}

function SearchMain() {
  const keyword = useRouteMatch<HomeOrSearchPageParams>().params.keyword ?? "";

  return (
    <div>
      <div className="py-5">
        <span className="h1">Search Results for "{keyword}"</span>
      </div>
      <BooksView type="search" />
    </div>
  );
}
