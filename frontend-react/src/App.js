import { createContext, useContext, useState } from 'react';
import { Route, Switch, Link, HashRouter as Router } from 'react-router-dom';
import _ from 'lodash';
import _BOOKS from './books.json';

const BOOKS = _(_BOOKS).keyBy("id").value();

const BookContext = createContext([]);

function App() {
  const [bookCount, setBookCount] = useState(8);
  const [cart, setCart] = useState([]);
  const addToCart = (id) => { setCart(cart.concat([id])); };

  return (
    <BookContext.Provider value={[bookCount, setBookCount, cart, addToCart]}>
      <Router>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/detail/:id" component={Detail} />
          <Route path="/home" component={Home} />
          <Route path="/search/:keyword?" component={Search} />
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    </BookContext.Provider>
  )
}

function BookCard({
  book,
  withLink,
}) {
  const path = `/detail/${book.id}`;

  return (
    <div className="card shadow-sm">
      <img src={book.image} alt="" className="card-img-top" />
      {
        withLink ?
          <Link to={path} className="stretched-link">
            <span className="visually-hidden">Details</span>
          </Link>
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

function Books({
  keyword = "",
}) {
  const [bookCount, _setBookCount] = useContext(BookContext);

  return _(BOOKS)
    .filter((book) => book.name.includes(keyword))
    .map((book) =>
      <div key={`book${book.id}`} className="col">
        <BookCard book={book} withLink={true} />
      </div>
    ).take(bookCount).value();
}

function SearchBox({
  initial = "",
}) {
  const [input, setInput] = useState(initial);

  return (
    <form className="d-flex mb-2 mb-lg-0">
      <input className="form-control me-2" type="search" placeholder="Search Books..." value={input} onChange={e => setInput(e.target.value)} />
      <Link className="btn btn-outline-secondary" to={`/search/${input}`}>Search</Link>
    </form>
  );
}

function Header({
  active,
  keyword = "",
}) {
  const [bookCount, setBookCount, cart, _addToCart] = useContext(BookContext);
  const cartCount = cart.length;

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bolder" to="/home">Book Store</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${active === "home" || active === "detail" ? "active" : ""}`} to="/home">Books</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link d-flex align-items-center ${active === "cart" ? "active" : ""}`} to="/checkout">
                  <span className="me-1">My Cart</span>
                  <span className={`badge bg-${cartCount === 0 ? "secondary" : "danger"} rounded-pill`}>{cartCount}</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${active === "orders" ? "active" : ""}`} to="#">My Orders</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="/login" tabIndex="-1">Hi, Bugen</Link>
              </li>
            </ul>
            <SearchBox initial={keyword}></SearchBox>
            {
              active === "home" ?
                (<div className="ms-2 d-flex">
                  <Link className="btn btn-success w-100" onClick={() => { setBookCount(bookCount + 1); }} to="#footer">Add a Book</Link>
                </div>) : null
            }
          </div>
        </div>
      </nav>
    </header>
  )
}

function CarouselItem({
  active = false,
  url,
}) {
  return (
    <div className={`carousel-item ${active ? "active" : ""}`}>
      <img src={url} className="d-block w-100" alt={`carousel ${url}`} />
    </div>
  );
}

function CarouselView() {
  return (
    <div id="carouselExampleControls" className="carousel slide mb-4 shadow-sm" data-bs-ride="carousel">
      <div className="carousel-inner">
        <CarouselItem url="static/book1.jpg" active={true} />
        <CarouselItem url="static/book2.jpg" />
        <CarouselItem url="static/book3.jpg" />
        <CarouselItem url="static/book4.jpg" />
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
        data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
        data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

function BooksView({
  keyword = "",
}) {
  return (
    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-3" id="books">
      <Books keyword={keyword}></Books>
    </div>
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

function SearchMain({
  keyword,
}) {
  return (
    <div>
      <BooksView keyword={keyword} />
    </div>
  );
}

function Pagination() {
  return (
    <footer className="py-4 bg-white" id="footer">
      <nav>
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <Link className="page-link" to="#" tabIndex="-1">Previous</Link>
          </li>

          <li className="page-item active"><Link className="page-link" to="#">1</Link></li>
          <li className="page-item"><Link className="page-link" to="#">2</Link></li>
          <li className="page-item"><Link className="page-link" to="#">3</Link></li>

          <li className="page-item">
            <Link className="page-link" to="#">Next</Link>
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

function Main({
  py: py_ = 4,
  children,
}) {
  const py = `py-${py_}`

  return (
    <main className={`${py} container`}>
      {children}
    </main>
  )
}

function Home() {
  return (
    <Body>
      <Header active="home" />
      <Main>
        <HomeMain />
      </Main>
      <Pagination />
    </Body>
  )
}

function Search(props) {
  const keyword = props.match.params.keyword ?? "";

  return (
    <Body>
      <Header active="home" keyword={keyword} />
      <Main>
        <SearchMain keyword={keyword} />
      </Main>
      <Pagination />
    </Body>
  )
}

function BookDetail({
  book,
}) {
  const [_bc, _sbc, _cart, addToCart] = useContext(BookContext);

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
              <button type="button" className="btn btn-outline-danger w-100" onClick={() => { addToCart(book.id) }}>Add to Cart</button>
              <Link className="btn btn-danger w-100" to="/checkout">Checkout</Link>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

function DetailMain({
  id,
}) {
  const book = BOOKS[id];

  return (
    <div>
      <nav>
        <ol className="breadcrumb h6">
          <li className="breadcrumb-item"><Link to="/home">Books</Link></li>
          <li className="breadcrumb-item active">{book.name}</li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-md-4">
          <BookCard book={book} withLink={false} />
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
      <Header active="detail" />
      <Main py={5}>
        <DetailMain id={id} />
      </Main>
    </Body>
  )
}

function CartItem({
  book,
}) {
  return (
    <li className="list-group-item d-flex justify-content-between lh-sm">
      <div>
        <h6 className="my-0">{book.name}</h6>
        <small className="text-muted">{book.author}</small>
      </div>
      <span className="text-muted">¥{book.price}</span>
    </li>
  );
}

function AddressItem({
  active,
  address,
}) {
  const bgClass = address.tag === "Default" ? "bg-secondary" : "bg-success";

  return (
    <Link to="#" className={`list-group-item list-group-item-action ${active ? "active" : ""}`}>
      <div className="d-flex w-100 justify-content-between align-items-center">
        <h5 className="mb-1">{address.name}</h5>
        <span className={`badge ${bgClass} rounded-pill`}>{address.tag}</span>
      </div>
      <p className="mb-0 small">{address.phone}</p>
      <p className="mb-0">{address.address}</p>
    </Link>
  );
}

function Cart() {
  const [_bc, _sbc, cart, _addToCart] = useContext(BookContext);

  const books = _(cart).map((id) => BOOKS[id]);
  const sumPrice = _(books).map((book) => book.price).sum();
  const discount = Math.min(100.0, sumPrice * 0.3);
  const totalPrice = sumPrice - discount;
  const cartItems = books.map((b) => <CartItem book={b} />).value();

  return (
    <div>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Your cart</span>
        <span className="badge bg-secondary rounded-pill">{books.size()}</span>
      </h4>
      <ul className="list-group mb-3">
        {cartItems}
        <li className="list-group-item d-flex justify-content-between lh-sm">
          <span>Discount</span>
          <span className="text-danger fw-bold"> -¥{discount.toFixed(2)}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Total</span>
          <span className="fw-bold">¥{totalPrice.toFixed(2)}</span>
        </li>
      </ul>
    </div>
  )
}

function CheckoutMain() {
  return (
    <div>
      <div className="row">
        <div className="col-md-5 col-lg-4 order-md-last">
          <Cart />
        </div>
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">Shipping Address</h4>
          <form className="needs-validation" noValidate="">

            <div className="list-group">
              <AddressItem active={true} address={{
                name: "Bugen Zhao",
                tag: "Default",
                phone: "+86 155 2121 2121",
                address: "1234 Main St., Shanghai, China"
              }} />
              <AddressItem address={{
                name: "Bugen Zhao",
                tag: "Home",
                phone: "+86 155 2121 2121",
                address: "4321 Home St., Shanghai, China"
              }} />
              <AddressItem address={{
                name: "Fuken Chao",
                tag: "School",
                phone: "+86 188 1234 5678",
                address: "9876 School St., Shanghai, China"
              }} />
              <Link to="#" className="list-group-item list-group-item-action">
                <span className="text-muted">Add a new address...</span>
              </Link>
            </div>

          </form>

          <hr className="my-4" />

          <h4 className="mb-3">Payment</h4>

          <div className="row gy-2">
            <div className="col-lg-5 col-xxl-4">
              <div className="list-group">
                <Link to="#" className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between align-items-center">
                    <span>PayPal</span>
                  </div>
                </Link>
                <Link to="#" className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between align-items-center">
                    <span>WeChat Pay</span>
                    <span className="badge bg-success rounded-pill">Recommended</span>
                  </div>
                </Link>
                <Link to="#" className="list-group-item list-group-item-action"
                >
                  <div className="d-flex w-100 justify-content-between align-items-center">
                    <span>Alipay</span>
                    <span className="badge bg-secondary rounded-pill">Last used</span>
                  </div>
                </Link>
                <Link to="#" className="list-group-item list-group-item-action active">
                  <span className="">Credit card</span>
                </Link>
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
      <Header active="cart" />
      <Main py={5}>
        <CheckoutMain />
      </Main>
    </Body>
  )
}

function Login() {
  return (
    <main className="form-signin">
      <form>
        <h1 className="h1 mb-3 fw-bold">Sign in</h1>
        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required=""
          autoFocus="" defaultValue="Bugen" />
        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required=""
          defaultValue="password" />
        <div className="mb-3 form-check form-switch">
          <label>
            <input type="checkbox" id="rememberMeCheck" className="form-check-input" defaultChecked={true} />
            <label htmlFor="rememberMeCheck" className="form-check-label">Remember me</label>
          </label>
        </div>
        <Link className="btn btn-dark w-100 btn-lg" to="/home">Sign in</Link>
      </form>
    </main>
  )
}

export default App;
