import _ from "lodash";
import { EditingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

import { useContext } from 'react';
import { BooksContext } from '../services';


export function BookEditorView() {
  const [BOOKS, updateBOOKS] = useContext(BooksContext);

  const rows = _.values(BOOKS);
  const cols = _(_.first(rows))
    .keys()
    .filter((k) => k !== "id")
    .map((k) => { return { name: k, title: k }; })
    .value();

  function onCommitChanges({ added, changed, deleted }) {
    if (added) { // [row]
      updateBOOKS((bs) => {
        _(added)
          .forEach((rowAdded) => {
            const newId = _(BOOKS).keys().max() + 1;
            bs[newId] = { ...rowAdded, id: newId };
          });
      });
    }

    if (changed) { // {id: row}
      updateBOOKS((bs) => {
        _(changed)
          .toPairs()
          .forEach(([id, rowChanged]) => {
            bs[id] = { ...bs[id], ...rowChanged };
          });
      });
    }

    if (deleted) { // [rowIdx]
      updateBOOKS((bs) => {
        _(deleted)
          .forEach((id) => { delete bs[id]; });
      });
    }
  }

  return (
    <div className="card">
      <Grid
        rows={rows}
        columns={cols}
        getRowId={(row) => row.id}
      >
        <EditingState
          onCommitChanges={onCommitChanges} />
        <Table />
        <TableHeaderRow />
        <TableEditRow />
        <TableEditColumn
          showAddCommand
          showEditCommand
          showDeleteCommand />
      </Grid>
    </div>
  );
}
