import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Order } from "../services/order";
import {
  PagingState,
  IntegratedPaging,
  SearchState,
  IntegratedFiltering,
  SortingState,
  IntegratedSorting,
  DataTypeProvider,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  SearchPanel,
  Toolbar,
  TableColumnResizing,
} from "@devexpress/dx-react-grid-bootstrap4";
import { DisplayCol } from "../views/ManagementView";
import { PropsWithChildren } from "react";
import { GridSortLabel } from "../components/GridSortLabel";

export function OrdersView({
  orders,
  showUser = false,
}: PropsWithChildren<{
  orders: Order[];
  showUser?: boolean;
}>) {
  const rows = orders.map((o) => {
    return {
      userShow: `${o.user?.username} [${o.user?.id}]`,
      ...o,
    };
  });

  type Items = Order["items"];
  type Row = typeof rows[number];

  const cols: DisplayCol<Row>[] = [
    { name: "id", title: "Order ID" },
    { name: "createdAt", title: "Created At" },
    { name: "items", title: "Items" },
    { name: "totalPrice", title: "Total" },
    { name: "consignee", title: "Consignee" },
    { name: "status", title: "Status" },
  ];

  if (showUser) {
    cols.splice(1, 0, { name: "userShow", title: "User" });
  }

  const widths = [
    { columnName: "id", width: 120 },
    { columnName: "userShow", width: 150 },
    { columnName: "createdAt", width: 280 },
    { columnName: "items", width: 350 },
    { columnName: "totalPrice", width: 100 },
    { columnName: "consignee", width: 150 },
    { columnName: "status", width: 100 },
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
      <Grid rows={rows} columns={cols} getRowId={(row) => row.id}>
        <SearchState />
        <IntegratedFiltering />
        <PagingState defaultCurrentPage={0} pageSize={20} />
        <IntegratedPaging />
        <SortingState
          defaultSorting={[{ columnName: "id", direction: "asc" }]}
        />
        <IntegratedSorting />
        <DataTypeProvider
          formatterComponent={OrderItemFormatter}
          for={["items"]}
        />
        <Table />
        <TableColumnResizing defaultColumnWidths={widths} />
        <TableHeaderRow
          showSortingControls
          sortLabelComponent={GridSortLabel}
        />
        <Toolbar />
        <SearchPanel />
        <PagingPanel />
      </Grid>
    </div>
  );
}
