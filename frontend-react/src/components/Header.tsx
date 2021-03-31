import { useState } from "react";
import {
  Button,
  OverlayTrigger,
  Tooltip,
  Nav,
  Navbar,
  Form,
  FormControl,
  Container,
  Badge,
} from "react-bootstrap";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { SearchPageParams } from "../routes";
import { useStore } from "../services/StoreContext";

export function Header({
  active,
}: {
  active: "home" | "detail" | "search" | "cart" | "orders" | "dashboard";
}) {
  const { cart, isAdmin } = useStore();
  const cartCount = cart.length;
  const keyword = useRouteMatch<SearchPageParams>().params.keyword ?? "";

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm fixed-top">
      <Container>
        <Navbar.Brand className="fw-bolder" as={Link} to="/home">
          Book Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/home"
              active={
                active === "home" || active === "detail" || active === "search"
              }
            >
              Books
            </Nav.Link>
            <Nav.Link as={Link} to="/checkout" active={active === "orders"}>
              <div className={`d-flex align-items-center`}>
                <span className="me-1">My Cart</span>
                <Badge
                  bg={cartCount === 0 ? "secondary" : "danger"}
                  pill={true}
                >
                  {cartCount}
                </Badge>
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to="#" active={active === "orders"}>
              My Orders
            </Nav.Link>

            <NavUserItem />
          </Nav>

          <SearchBox initial={keyword}></SearchBox>
          {isAdmin ? <DashboardButton active={active} /> : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function NavUserItem() {
  const { user, setUser, setSignedOut } = useStore();
  const history = useHistory();

  return (
    <OverlayTrigger
      overlay={<Tooltip id="signout-tooltip">Sign out</Tooltip>}
      placement="auto"
    >
      <Nav.Link
        onClick={() => {
          setUser("");
          setSignedOut(true);
          history.push("/login");
        }}
      >
        <span>Hi, </span>
        <span className="fw-bold">{user}</span>
      </Nav.Link>
    </OverlayTrigger>
  );
}

function SearchBox({ initial = "" }) {
  const [input, setInput] = useState(initial);
  const history = useHistory();

  return (
    <Form
      className="d-flex mb-2 mb-lg-0"
      onSubmit={() => {
        if (input.length > 0) {
          history.push(`/search/${input}`);
        }
      }}
    >
      <FormControl
        className="form-control me-2"
        type="search"
        placeholder="Search Books..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button variant="outline-secondary">Search</Button>
    </Form>
  );
}

function DashboardButton({ active }: { active: string }) {
  return (
    <div className="ms-md-2 d-flex">
      {active === "dashboard" ? (
        <Button as={Link} to="/home" variant="success" className="w-100">
          Book Store
        </Button>
      ) : (
        <Button as={Link} to="/dashboard" variant="primary" className="w-100">
          Dashboard
        </Button>
      )}
    </div>
  );
}
