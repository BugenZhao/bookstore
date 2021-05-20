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
import { PropsWithChildren, useRef } from "react";
import { Form } from "react-bootstrap";

export type Col<R> = keyof R & string;
export type DisplayCol<R> = {
  name: Col<R>;
  title: string;
};
export type Patch<R> = Partial<Record<Col<R>, any>>;

export function ManagementView<R>({
  rows,
  cols,
  onCommitChanges,
  booleanCols,
  disableEditingCols = ["id"],
  showAddCommand = false,
  showEditCommand = false,
  showDeleteCommand = false,
  children,
}: PropsWithChildren<{
  rows: R[];
  cols: DisplayCol<R>[];
  onCommitChanges: ({
    added,
    changed,
    deleted,
  }: {
    added?: readonly Patch<R>[];
    changed?: Record<string, Patch<R> | undefined>;
    deleted?: ChangeSet["deleted"];
  }) => void;
  booleanCols?: string[];
  disableEditingCols?: string[];
  showAddCommand?: boolean;
  showEditCommand?: boolean;
  showDeleteCommand?: boolean;
}>) {
  const editingStateColumnExtensions = useRef(
    disableEditingCols.map((col) => {
      return { columnName: col, editingEnabled: false };
    })
  );

  return (
    <div className="card">
      <Grid rows={rows} columns={cols} getRowId={(row) => row.id}>
        <SearchState />
        <IntegratedFiltering />
        <PagingState defaultCurrentPage={0} pageSize={20} />
        <IntegratedPaging />
        {booleanCols ? <BooleanTypeProvider for={booleanCols} /> : null}
        {children}
        <EditingState
          onCommitChanges={onCommitChanges}
          columnExtensions={editingStateColumnExtensions.current}
        />
        <Table />
        <TableHeaderRow />
        <TableEditRow />
        <TableEditColumn
          showAddCommand={showAddCommand}
          showEditCommand={showEditCommand}
          showDeleteCommand={showDeleteCommand}
        />
        <Toolbar />
        <SearchPanel />
        <PagingPanel />
      </Grid>
    </div>
  );
}

const BooleanFormatter = ({ value }: { value: boolean }) => (
  <Form.Check type="checkbox" checked={value} disabled />
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
