import { useAllOrders } from "../services/admin";
import { OrdersView } from "./OrdersView";

export function OrderManagementView() {
  return <OrdersView useOrders={useAllOrders} showUser />;
}
