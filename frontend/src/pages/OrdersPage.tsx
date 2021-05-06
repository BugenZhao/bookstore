import { PropsWithChildren } from "react";
import { Table, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Order, useOrders } from "../services/order";
import { Body } from "./common/Body";
import { Main } from "./common/Main";

export function OrdersPage() {
  return (
    <Body>
      <Header active="orders" />
      <Main>
        <OrdersMain />
      </Main>
    </Body>
  );
}

export function OrderItem({
  order,
}: PropsWithChildren<{
  order: Order;
}>) {
  const cartItems = order.cart.books.map((b) => (
    <Row>
      <Link to={`/detail/${b.book.id}`} className="d-flex nav-link">
        <span className="me-auto">{b.book.name}</span>
        <span className="text-muted">x{b.count}</span>
      </Link>
    </Row>
  ));

  return (
    <tr>
      <td className="align-middle">{order.id}</td>
      <td className="align-middle">{order.datetime}</td>
      <td className="align-middle w-25">{cartItems}</td>
      <td className="align-middle">¥{order.cart.total}</td>
      <td className="align-middle">{order.consignee}</td>
      <td className="align-middle">{order.status}</td>
    </tr>
  );
}

export function OrdersMain() {
  const orders = useOrders();

  const orderItems = orders.map((order) => <OrderItem order={order} />);

  return (
    <>
      <div className="h1 mb-4">My Orders</div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Datetime</th>
            <th>Items</th>
            <th>Total Price</th>
            <th>Consignee</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{orderItems}</tbody>
      </Table>
    </>
  );
}
