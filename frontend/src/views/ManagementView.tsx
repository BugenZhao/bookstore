import {
  EditingState,
  PagingState,
  ChangeSet,
  SearchState,
  IntegratedFiltering,
  SortingState,
  IntegratedSorting,
  DataTypeProvider,
  DataTypeProviderProps,
  CustomPaging,
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
import { PropsWithChildren, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { GridSortLabel } from "../components/GridSortLabel";
import { PagingRequest } from "../services";

export type Col<R> = keyof R & string;
export type DisplayCol<R> = {
  name: Col<R>;
  title: string;
};
export type Patch<R> = Partial<Record<Col<R>, any>>;

export function ManagementView<R extends { id: any }>({
  useData,
  cols,
  onCommitChanges,
  booleanCols,
  disableEditingCols = ["id"],
  showAddCommand = false,
  showEditCommand = false,
  showDeleteCommand = false,
}: PropsWithChildren<{
  useData: (
    pageReq: PagingRequest
  ) => {
    rows: R[];
    total: number;
    revalidate: () => Promise<boolean>;
  };
  cols: DisplayCol<R>[];
  onCommitChanges: ({
    added,
    changed,
    deleted,
  }: {
    added?: readonly Patch<R>[];
    changed?: Record<string, Patch<R> | undefined>;
    deleted?: ChangeSet["deleted"];
  }) => Promise<void>;
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
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 20;
  const { rows, total, revalidate } = useData({
    page: currentPage,
    size: pageSize,
  });

  return (
    <div className="card">
      <Grid rows={rows} columns={cols} getRowId={(row: R) => row.id}>
        <SearchState />
        <IntegratedFiltering />
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
        />
        <CustomPaging totalCount={total} />
        <SortingState
          defaultSorting={[{ columnName: "id", direction: "asc" }]}
        />
        <IntegratedSorting />
        <BooleanTypeProvider for={booleanCols ?? []} />
        <EditingState
          onCommitChanges={async (changeSet) => {
            await onCommitChanges(changeSet);
            await revalidate();
          }}
          columnExtensions={editingStateColumnExtensions.current}
        />
        <Table />
        <TableHeaderRow
          showSortingControls
          sortLabelComponent={GridSortLabel}
        />
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
