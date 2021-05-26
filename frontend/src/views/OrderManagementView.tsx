import { useAllOrders } from "../services/admin";
import { OrdersView } from "./OrdersView";

export function OrderManagementView() {
  const { orders } = useAllOrders();
  return <OrdersView orders={orders} showUser />;
}
