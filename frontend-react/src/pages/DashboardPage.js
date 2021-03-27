import { Header } from '../components/Header';
import { CarouselView } from '../views/CarouselView';
import { BooksView } from '../views/BooksView';
import { Main } from "./common/Main";
import { Body } from "./common/Body";
import _ from "lodash";

import { EditingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import { useContext, useState } from 'react';
import { BooksContext } from '../services';

export function DashboardPage() {
  return (
    <Body>
      <Header active="dashboard" />
      <Main>
        <DashboardMain />
      </Main>
    </Body>
  );
}

function DashboardMain() {
  const BOOKS = useContext(BooksContext);
  const rows = _(BOOKS).values().value();
  const cols = _(rows[0]).keys().map((k) => {
    return { name: k, title: k };
  }).value();

  return (
    <div className="card">
      <Grid
        rows={rows}
        columns={cols}
        getRowId={(row) => row.id}
      >
        <EditingState
          onCommitChanges={() => { }}
        />
        <Table />
        <TableHeaderRow />
        <TableEditRow />
        <TableEditColumn
          showAddCommand
          showEditCommand
          showDeleteCommand
        />
      </Grid>
    </div>
  );
}
