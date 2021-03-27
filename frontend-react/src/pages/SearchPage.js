import { Header } from '../components/Header';
import { Pagination } from '../components/Pagination';
import { BooksView } from '../views/BooksView';
import { Main } from "./common/Main";
import { Body } from "./common/Body";

export function SearchPage(props) {
  const keyword = props.match.params.keyword ?? "";

  return (
    <Body>
      <Header active="search" keyword={keyword} />
      <Main>
        <SearchMain keyword={keyword} />
      </Main>
      <Pagination />
    </Body>
  );
}

function SearchMain({
  keyword,
}) {
  return (
    <div>
      <div className="py-5"><span className="h1">
        Search Results for "{keyword}"
      </span></div>
      <BooksView keyword={keyword} />
    </div>
  );
}