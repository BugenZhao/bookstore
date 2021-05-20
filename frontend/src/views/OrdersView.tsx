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
import { User } from "../services/admin";

export function OrdersView({
  orders,
  showUser = false,
}: PropsWithChildren<{
  orders: Order[];
  showUser?: boolean;
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

  if (showUser) {
    cols.splice(1, 0, { name: "user", title: "User" });
  }

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

  const UserFormatter = ({ value }: { value: User }) => {
    return <>{`${value.username} (${value.id})`}</>;
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
        <DataTypeProvider formatterComponent={UserFormatter} for={["user"]} />
        <Table />
        <TableHeaderRow />
        <Toolbar />
        <SearchPanel />
        <PagingPanel />
      </Grid>
    </div>
  );
}
