import { Header } from '../components/Header';
import { CarouselView } from '../views/CarouselView';
import { BooksView } from '../views/BooksView';
import { Main } from "./common/Main";
import { Body } from "./common/Body";

export function HomePage() {
  return (
    <Body>
      <Header active="home" />
      <Main>
        <HomeMain />
      </Main>
    </Body>
  );
}

function HomeMain() {
  return (
    <div>
      <CarouselView />
      <BooksView />
    </div>
  );
}
