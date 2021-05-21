import { FC } from "react";
import { TableHeaderRow } from "@devexpress/dx-react-grid-bootstrap4";
import { ArrowDown, ArrowUp } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

const SortingIcon = ({ direction }: { direction: "asc" | "desc" }) =>
  direction === "asc" ? <ArrowUp /> : <ArrowDown />;

export const GridSortLabel: FC<TableHeaderRow.SortLabelProps> = ({
  onSort,
  children,
  direction,
}) => (
  <Button variant="light" onClick={() => onSort({})}>
    <span className="fw-bold">{children}</span>
    {direction && <SortingIcon direction={direction} />}
  </Button>
);
