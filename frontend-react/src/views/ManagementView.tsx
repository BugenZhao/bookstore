import {
  EditingState,
  PagingState,
  IntegratedPaging,
  ChangeSet,
  SearchState,
  IntegratedFiltering,
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

export function ManagementView<T>({
  rows,
  cols,
  onCommitChanges,
}: PropsWithChildren<{
  rows: T[];
  cols: { name: string; title: string }[];
  onCommitChanges: ({ added, changed, deleted }: ChangeSet) => void;
}>) {
  return (
    <div className="card">
      <Grid rows={rows} columns={cols} getRowId={(row) => row.id}>
        <SearchState />
        <IntegratedFiltering />
        <PagingState defaultCurrentPage={0} pageSize={20} />
        <IntegratedPaging />
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
