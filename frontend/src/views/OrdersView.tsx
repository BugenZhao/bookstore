import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Order } from "../services/order";
import {
  PagingState,
  IntegratedPaging,
  SearchState,
  IntegratedFiltering,
  DataTypeProvider,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  SearchPanel,
  Toolbar,
} from "@devexpress/dx-react-grid-bootstrap4";
import { DisplayCol } from "../views/ManagementView";
import { PropsWithChildren } from "react";

export function OrdersView({
  orders,
  showUsername = false,
}: PropsWithChildren<{
  orders: Order[];
  showUsername?: boolean;
}>) {
  type Items = Order["items"];
  type Row = Order;
  const cols: DisplayCol<Row>[] = [
    { name: "id", title: "Order ID" },
    { name: "createdAt", title: "Created At" },
    { name: "items", title: "Items" },
    { name: "totalPrice", title: "Total Price" },
    { name: "consignee", title: "Consignee" },
    { name: "status", title: "Status" },
  ];

  const OrderItemFormatter = ({ value }: { value: Items }) => {
    const items = value.map(({ book, quantity }) => (
      <Row key={book.id}>
        <Link to={`/detail/${book.id}`} className="d-flex nav-link">
          <span className="me-auto">{book.name}</span>
          <span className="text-muted">x{quantity}</span>
        </Link>
      </Row>
    ));
    return <>{items}</>;
  };

  return (
    <div className="card">
      <Grid rows={orders} columns={cols} getRowId={(row) => row.id}>
        <SearchState />
        <IntegratedFiltering />
        <PagingState defaultCurrentPage={0} pageSize={20} />
        <IntegratedPaging />
        <DataTypeProvider
          formatterComponent={OrderItemFormatter}
          for={["items"]}
        />
        <Table />
        <TableHeaderRow />
        <Toolbar />
        <SearchPanel />
        <PagingPanel />
      </Grid>
    </div>
  );
}
