import { Header } from "../components/Header";
import { useOrders } from "../services/order";
import { Body } from "./common/Body";
import { Main } from "./common/Main";
import { OrdersView } from "../views/OrdersView";

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

function OrdersMain() {
  const { orders } = useOrders();

  return (
    <>
      <div className="h1 mb-4">My Orders</div>
      <OrdersView orders={orders} />
    </>
  );
}
