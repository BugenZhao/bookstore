import {
  EditingState,
  PagingState,
  IntegratedPaging,
  ChangeSet,
  SearchState,
  IntegratedFiltering,
  DataTypeProvider,
  DataTypeProviderProps,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  PagingPanel,
  SearchPanel,
  Toolbar,
} from "@devexpress/dx-react-grid-bootstrap4";
import { PropsWithChildren } from "react";
import { Form } from "react-bootstrap";

export function ManagementView<T>({
  rows,
  cols,
  onCommitChanges,
  booleanCols,
  children,
}: PropsWithChildren<{
  rows: T[];
  cols: { name: string; title: string }[];
  onCommitChanges: ({ added, changed, deleted }: ChangeSet) => void;
  booleanCols?: string[];
}>) {
  return (
    <div className="card">
      <Grid rows={rows} columns={cols} getRowId={(row) => row.id}>
        <SearchState />
        <IntegratedFiltering />
        <PagingState defaultCurrentPage={0} pageSize={20} />
        <IntegratedPaging />
        {booleanCols ? <BooleanTypeProvider for={booleanCols} /> : null}
        {children}
        <EditingState onCommitChanges={onCommitChanges} />
        <Table />
        <TableHeaderRow />
        <TableEditRow />
        <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
        <Toolbar />
        <SearchPanel />
        <PagingPanel />
      </Grid>
    </div>
  );
}

const BooleanFormatter = ({ value }: { value: boolean }) => (
  <Form.Check type="checkbox" defaultChecked={value} disabled />
);

const BooleanEditor = ({
  value,
  onValueChange,
}: {
  value: boolean;
  onValueChange: (b: boolean) => void;
}) => (
  <Form.Check
    type="checkbox"
    defaultChecked={value}
    onChange={(e) => onValueChange(e.target.checked)}
  />
);

const BooleanTypeProvider = ({ for: booleanCols }: DataTypeProviderProps) => (
  <DataTypeProvider
    formatterComponent={BooleanFormatter}
    editorComponent={BooleanEditor}
    for={booleanCols}
  />
);
