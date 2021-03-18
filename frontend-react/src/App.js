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
        <Route path="/checkout" component={Checkout} />
        <Route path="/detail/:id" component={Detail}></Route>
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  )
}

function BookCard(props) {
  const book = props.book
  const path = `/detail/${book.id}`;

  return (
    <div className="card shadow-sm">
      <img src={book.image} alt="" className="card-img-top" />
      {
        props.link ?
          (<Link to={path} className="stretched-link"><span className="visually-hidden">Details</span></Link>)
          : null
      }
      <div className="card-body">
        <h5 className="card-title text-truncate">{book.name}</h5>
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="card-subtitle text-danger">¥{book.price}</h6>
          <small className="card-subtitle text-muted">{book.inventory}+</small>
        </div>
      </div>
    </div>
  );
}

function Books() {
  return books.map((book) => (
    <div key={`book${book.id}`} className="col">
      <BookCard
        book={book}
        link={true}
      />
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
                <Link className="nav-link" to="#">My Orders</Link>
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
            <Link className="page-link" to="#" tabIndex="-1" aria-disabled="true">Previous</Link>
          </li>

          <li className="page-item active"><a className="page-link" href="#">1</a></li>
          <li className="page-item" aria-current="page"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>

          <li className="page-item">
            <Link className="page-link" href="#">Next</Link>
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
  const py = `py-${props.py || 4}`

  return (
    <main className={`${py} container`}>
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

function BookDetail(props) {
  const book = props.book;

  return (
    <div>
      <h1 className="h4 my-3">{book.name}</h1>
      <div className="mb-3">
        <dl className="row">
          <dt className="col-sm-3">Author</dt>
          <dd className="col-sm-9">{book.author}</dd>

          <dt className="col-sm-3">Press</dt>
          <dd className="col-sm-9">Unknown Press</dd>

          <dt className="col-sm-3">Category</dt>
          <dd className="col-sm-9">{book.type}</dd>

          <dt className="col-sm-3">Stock</dt>
          <dd className="col-sm-9">{book.inventory}+</dd>

          <dt className="col-sm-3">Price</dt>
          <dd className="col-sm-9 text-danger fw-bold">¥{book.price}</dd>

          <dt className="col-sm-3">Introduction</dt>
          <dd className="col-sm-9">
            {book.description}
          </dd>
        </dl>
        <div className="my-3">
          <div className="d-flex justify-content-end">
            <div className="btn-group btn-group-lg col-12 col-xl-6 col-lg-8" role="group">
              <button type="button" className="btn btn-outline-danger w-100">Add to Cart</button>
              <Link className="btn btn-danger w-100" to="/checkout">Buy</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailMain(props) {
  const book = books[props.id - 1];

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb h6">
          <li className="breadcrumb-item"><Link to="/">Books</Link></li>
          <li className="breadcrumb-item active">{book.name}</li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-4">
          <BookCard book={book} link={false} />
        </div>

        <div className="col-md-8">
          <BookDetail book={book} />
        </div>

      </div>
    </div>

  )
}

function Detail(props) {
  const id = props.match.params.id;

  return (
    <Body>
      <Header />
      <Main py={5}>
        <DetailMain id={id} />
      </Main>
    </Body>
  )
}

function CheckoutMain() {
  return (
    <div>
      <div className="row">
        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            <span className="badge bg-secondary rounded-pill">2</span>
          </h4>
          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">Java 核心技术</h6>
                <small className="text-muted">Cay S. Horstmann</small>
              </div>
              <span className="text-muted">¥95.2</span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">Effective C++</h6>
                <small className="text-muted">Scott Meyers</small>
              </div>
              <span className="text-muted">¥51.3</span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <span>Discount</span>
              <span className="text-danger fw-bold"> -¥100.0</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total</span>
              <span className="fw-bold">¥46.5</span>
            </li>
          </ul>
        </div>
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">Shipping Address</h4>
          <form className="needs-validation" noValidate="">

            <div className="list-group">
              <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
                <div className="d-flex w-100 justify-content-between align-items-center">
                  <h5 className="mb-1">Bugen Zhao</h5>
                  <span className="badge bg-secondary rounded-pill">Default</span>
                </div>
                <p className="mb-0 small">+86 155 2121 2121</p>
                <p className="mb-0">1234 Main St., Shanghai, China</p>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between align-items-center">
                  <h5 className="mb-1">Bugen Zhao</h5>
                  <span className="badge bg-success rounded-pill">Home</span>
                </div>
                <p className="mb-0 small">+86 155 2121 2121</p>
                <p className="mb-0">4321 Home St., Shanghai, China</p>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                <span className="text-muted">Add a new address...</span>
              </a>
            </div>

          </form>

          <hr className="my-4" />

          <h4 className="mb-3">Payment</h4>

          <div className="row gy-2">
            <div className="col-lg-5 col-xxl-4">
              <div className="list-group">
                <a href="#" className="list-group-item list-group-item-action" aria-current="true">
                  <div className="d-flex w-100 justify-content-between align-items-center">
                    <span>PayPal</span>
                  </div>
                </a>
                <a href="#" className="list-group-item list-group-item-action" aria-current="true">
                  <div className="d-flex w-100 justify-content-between align-items-center">
                    <span>WeChat Pay</span>
                    <span className="badge bg-success rounded-pill">Recommended</span>
                  </div>
                </a>
                <a href="#" className="list-group-item list-group-item-action"
                  aria-current="true">
                  <div className="d-flex w-100 justify-content-between align-items-center">
                    <span>Alipay</span>
                    <span className="badge bg-secondary rounded-pill">Last used</span>
                  </div>
                </a>
                <a href="#" className="list-group-item list-group-item-action active">
                  <span className="">Credit card</span>
                </a>
              </div>
            </div>

            <div className="col">
              <div className="row gy-2">
                <div className="col-md-6">
                  <label htmlFor="cc-name" className="form-label">Name on card</label>
                  <input type="text" className="form-control" id="cc-name" placeholder="" required="" />
                </div>

                <div className="col-md-6">
                  <label htmlFor="cc-number" className="form-label">Card number</label>
                  <input type="text" className="form-control" id="cc-number" placeholder=""
                    required="" />
                </div>

                <div className="col-md-6">
                  <label htmlFor="cc-expiration" className="form-label">Expiration</label>
                  <input type="text" className="form-control" id="cc-expiration" placeholder=""
                    required="" />
                </div>

                <div className="col-md-6">
                  <label htmlFor="cc-cvv" className="form-label">CVV</label>
                  <input type="text" className="form-control" id="cc-cvv" placeholder="" required="" />
                </div>
              </div>

            </div>


          </div>

          <hr className="my-4" />

          <div className="d-flex justify-content-end">
            <button className="btn btn-primary btn-lg col-12 col-lg-3" type="submit">Checkout</button>
          </div>

        </div>
      </div>
    </div>
  )
}

function Checkout() {
  return (
    <Body>
      <Header />
      <Main py={5}>
        <CheckoutMain />
      </Main>
    </Body>
  )
}

export default App;
