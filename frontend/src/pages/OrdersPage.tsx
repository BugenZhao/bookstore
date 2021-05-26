import { Header } from "../components/Header";
import { useOrders } from "../services/order";
import { Body } from "./common/Body";
import { Main } from "./common/Main";
import { OrdersView } from "../views/OrdersView";
import { Tab, Tabs } from "react-bootstrap";
import { OrdersPageParams } from "../routes";
import { useHistory, useRouteMatch } from "react-router-dom";
import { OrdersSummaryView } from "../views/OrdersSummaryView";

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
  const tab = useRouteMatch<OrdersPageParams>().params.tab ?? "all";
  const history = useHistory();

  return (
    <>
      <div className="h1 mb-4">My Orders</div>
      <Tabs
        activeKey={tab}
        onSelect={(k) => {
          const tab = k ?? "books";
          history.replace(`/orders/${tab}`);
        }}
        className="mb-3"
      >
        <Tab eventKey="all" title="All Orders">
          <AllOrdersView />
        </Tab>
        <Tab eventKey="summary" title="Summary">
          <OrdersSummaryView />
        </Tab>
      </Tabs>
    </>
  );
}

function AllOrdersView() {
  const { orders } = useOrders();
  return <OrdersView orders={orders} />;
}
