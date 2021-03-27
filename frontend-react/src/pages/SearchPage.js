import { Header } from '../components/Header';
import { Pagination } from '../components/Pagination';
import { BooksView } from '../views/BooksView';
import { Body, Main } from '../App';

export function SearchPage(props) {
  const keyword = props.match.params.keyword ?? "";

  return (
    <Body>
      <Header active="home" keyword={keyword} />
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
      <BooksView keyword={keyword} />
    </div>
  );
}
