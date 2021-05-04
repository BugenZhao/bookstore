import { useRef } from "react";
import { Bounce } from "react-awesome-reveal";
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
import _ from "lodash";
import { post, UserType, useUser } from "../services";

export function Header({
  active,
}: {
  active: "home" | "detail" | "search" | "cart" | "orders" | "dashboard";
}) {
  const { getCartCount } = useStore();
  const isAdmin = useUser().data?.user_type === UserType.admin ?? false;
  const keyword = useRouteMatch<SearchPageParams>().params.keyword ?? "";

  const cartCount = getCartCount();

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
                <Bounce>
                  <Badge bg={cartCount === 0 ? "secondary" : "danger"} pill>
                    {cartCount}
                  </Badge>
                </Bounce>
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
  const { setSignedOut } = useStore();
  const history = useHistory();
  const { data: user, revalidate } = useUser();

  return (
    <OverlayTrigger
      overlay={<Tooltip id="signout-tooltip">Sign out</Tooltip>}
      placement="auto"
    >
      <Nav.Link
        onClick={async () => {
          await post("/users/logout");
          await revalidate();
          setSignedOut(true);
          history.push("/login");
        }}
      >
        <span>Hi, </span>
        <span className="fw-bold">{user?.username ?? "???"}</span>
      </Nav.Link>
    </OverlayTrigger>
  );
}

function SearchBox({ initial = "" }) {
  const inputRef = useRef<HTMLInputElement>(null!);
  const history = useHistory();

  return (
    <Form
      className="d-flex mb-2 mb-lg-0"
      onSubmit={() => {
        const input = inputRef.current.value;
        if (input.length > 0) {
          history.push(`/search/${input}`);
        }
      }}
    >
      <FormControl
        className="form-control me-2"
        type="search"
        placeholder="Search Books..."
        defaultValue={initial}
        ref={inputRef}
      />
      <Button variant="outline-secondary" type="submit">
        Search
      </Button>
    </Form>
  );
}

function DashboardButton({ active }: { active: string }) {
  return (
    <div className="ms-lg-2 d-flex">
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
