import { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { SearchPageParams } from "../routes";
import { ADMINS, useStore } from "../services";

function SearchBox({ initial = "" }) {
  const [input, setInput] = useState(initial);
  const history = useHistory();

  return (
    <form
      className="d-flex mb-2 mb-lg-0"
      onSubmit={() => {
        if (input.length > 0) {
          history.push(`/search/${input}`);
        }
      }}
    >
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search Books..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="btn btn-outline-secondary" type="submit">
        Search
      </button>
    </form>
  );
}

export function Header({ active }: { active: string }) {
  const { cart, user } = useStore();
  const cartCount = cart.length;
  const keyword = useRouteMatch<SearchPageParams>().params.keyword ?? "";

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bolder" to="/home">
            Book Store
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    active === "home" ||
                    active === "detail" ||
                    active === "search"
                      ? "active"
                      : ""
                  }`}
                  to="/home"
                >
                  Books
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link d-flex align-items-center ${
                    active === "cart" ? "active" : ""
                  }`}
                  to="/checkout"
                >
                  <span className="me-1">My Cart</span>
                  <span
                    className={`badge bg-${
                      cartCount === 0 ? "secondary" : "danger"
                    } rounded-pill`}
                  >
                    {cartCount}
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${active === "orders" ? "active" : ""}`}
                  to="#"
                >
                  My Orders
                </Link>
              </li>
              <li className="nav-item">
                <NavUserItem />
              </li>
            </ul>
            <SearchBox initial={keyword}></SearchBox>

            {ADMINS.includes(user) ? <DashboardButton active={active} /> : null}
          </div>
        </div>
      </nav>
    </header>
  );
}

function NavUserItem() {
  const { user, setUser } = useStore();
  const history = useHistory();

  return (
    <OverlayTrigger
      overlay={<Tooltip id="signout-tooltip">Sign out</Tooltip>}
      placement="right"
    >
      <Button
        variant="link"
        className="nav-link"
        onClick={() => {
          setUser("");
          history.push("/login");
        }}
      >
        <span>Hi, </span>
        <span className="fw-bold">{user}</span>
      </Button>
    </OverlayTrigger>
  );
}

function DashboardButton({ active }: { active: string }) {
  return (
    <div className="ms-2 d-flex">
      {active === "dashboard" ? (
        <Link className="btn btn-success w-100" to="/home">
          Book Store
        </Link>
      ) : (
        <Link className="btn btn-primary w-100" to="/dashboard">
          Dashboard
        </Link>
      )}
    </div>
  );
}
