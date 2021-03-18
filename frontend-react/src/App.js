import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
// import _ from 'lodash';
import books from './books.json';

/* eslint-disable jsx-a11y/anchor-is-valid */

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/detail/:id" component={Detail}></Route>
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  )
}

function Book(props) {
  const path = `/detail/${props.id}`;
  return (
    <div className="col">
      <div className="card shadow-sm">
        <img src={props.image} alt="" className="card-img-top" />
        <Link to={path} className="stretched-link"><span className="visually-hidden">Details</span></Link>
        <div className="card-body">
          <h5 className="card-title text-truncate">{props.name}</h5>
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="card-subtitle text-danger">¥{props.price}</h6>
            <small className="card-subtitle text-muted">{props.inventory}+</small>
          </div>
        </div>
      </div>
    </div>
  );
}

function Books() {
  return books.map((book) => (
    <div key={`book${book.id}`}>
      {Book(book)}
    </div>
  ));
}

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bolder" to="/">Book Store</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Books</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/checkout">My Cart</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">My Orders</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link disabled fw-bold" to="/login" tabIndex="-1"
                  aria-disabled="true">Hi, Bugen</Link>
              </li>
            </ul>
            <form className="d-flex me-3 mb-2 mb-lg-0">
              <input className="form-control me-2" type="search" placeholder="Search Books..." />
              <button className="btn btn-outline-secondary" type="submit">Search</button>
            </form>
            <div className="d-flex">
              <a className="btn btn-success w-100" onClick={() => { }} href="#footer">Add a Book</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

function HomeMain() {
  return (
    <div>
      <div id="carouselExampleControls" className="carousel slide mb-4 shadow-sm" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="static/book1.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="static/book2.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="static/book3.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="static/book4.jpg" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
          data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
          data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3" id="books">
        <Books></Books>
      </div>
    </div>
  );
}

function Pagination() {
  return (
    <footer className="py-4 bg-white" id="footer">
      <nav>
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
          </li>

          <li className="page-item active"><a className="page-link" href="#">1</a></li>
          <li className="page-item" aria-current="page"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>

          <li className="page-item">
            <a className="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

function Body(props) {
  return (
    <div className="store-home">
      {props.children}
    </div>
  )
}

function Main(props) {
  console.log(props);
  return (
    <main className="py-4 container">
      {props.children}
    </main>
  )
}

function Home() {
  return (
    <Body>
      <Header />
      <Main>
        <HomeMain />
      </Main>
      <Pagination />
    </Body>
  )
}

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <Link to="/">Back</Link>
    </div>
  )
}

function Detail(props) {
  const id = props.match.params.id;

  return (
    <Body>
      <Header />
      <Main>
        <div className="py-4 container">
          <h1>Detail of Book {id}</h1>
          <p>This is an example.</p>
          <Link to="/">Back</Link>
        </div>
      </Main>
    </Body>
  )
}

export default App;
