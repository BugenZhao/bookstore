import _ from "lodash";
import {
  EditingState,
  PagingState,
  IntegratedPaging,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  PagingPanel,
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

import { useContext } from 'react';
import { BooksContext, StoreContext } from '../services';


export function BookEditorView() {
  const [BOOKS, updateBOOKS] = useContext(BooksContext);
  const [cart, , setCart] = useContext(StoreContext);

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

      // cleanup the cart
      setCart(_(cart).filter((id) => !deleted.includes(id)).value());
    }
  }

  return (
    <div className="card">
      <Grid
        rows={rows}
        columns={cols}
        getRowId={(row) => row.id}
      >
        <PagingState
          defaultCurrentPage={0}
          pageSize={20}
        />
        <IntegratedPaging />
        <EditingState
          onCommitChanges={onCommitChanges} />
        <Table />
        <TableHeaderRow />
        <TableEditRow />
        <TableEditColumn
          showAddCommand
          showEditCommand
          showDeleteCommand />
        <PagingPanel />
      </Grid>
    </div>
  );
}
