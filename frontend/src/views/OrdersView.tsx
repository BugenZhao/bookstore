import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Order } from "../services/order";
import {
  PagingState,
  IntegratedPaging,
  IntegratedFiltering,
  SortingState,
  IntegratedSorting,
  DataTypeProvider,
  FilteringState,
  GridColumnExtension,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableColumnResizing,
  TableFilterRow,
} from "@devexpress/dx-react-grid-bootstrap4";
import { DisplayCol } from "../views/ManagementView";
import { PropsWithChildren } from "react";
import { GridSortLabel } from "../components/GridSortLabel";
import moment from "moment";
import { DatetimeFormatter } from "../components/formatters";

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

  const filtering: GridColumnExtension[] = [
    {
      columnName: "createdAt",
      predicate: (value: string, filter) => {
        if (!filter.value) return true;
        const dates = filter.value.split(/,|~/).map((s) => s.trim());
        const curr = moment(value);
        if (dates.length === 1) {
          return curr.isSameOrAfter(dates[0]);
        } else {
          return curr.isSameOrAfter(dates[0]) && curr.isBefore(dates[1]);
        }
      },
    },
    {
      columnName: "items",
      predicate: (value: Items, filter) => {
        if (!filter.value) return true;
        const found =
          value
            .map((v) => v.book.name)
            .filter((n) => n.indexOf(filter.value!) >= 0).length > 0;
        return found;
      },
    },
  ];

  return (
    <div className="card">
      <Grid rows={rows} columns={cols} getRowId={(row) => row.id}>
        <FilteringState />
        <IntegratedFiltering columnExtensions={filtering} />
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
        <DataTypeProvider
          formatterComponent={DatetimeFormatter}
          for={["createdAt"]}
        />
        <Table />
        <TableColumnResizing defaultColumnWidths={widths} />
        <TableHeaderRow
          showSortingControls
          sortLabelComponent={GridSortLabel}
        />
        <TableFilterRow />
        <PagingPanel />
      </Grid>
    </div>
  );
}
