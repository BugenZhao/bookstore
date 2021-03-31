import _ from "lodash";
import { ChangeSet } from "@devexpress/dx-react-grid";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";

import { useContext } from "react";
import { BooksContext } from "../services/BooksContext";
import { useStore } from "../services/StoreContext";
import produce from "immer";
import { ManagementView } from "./ManagementView";

export function BookManagementView() {
  const { BOOKS, setBOOKS } = useContext(BooksContext);
  const { cart, setCart } = useStore();

  const rows = _.values(BOOKS);
  const cols = _(_.first(rows))
    .keys()
    .filter((k) => k !== "id")
    .map((k) => {
      return { name: k, title: k };
    })
    .value();

  function onCommitChanges({ added, changed, deleted }: ChangeSet) {
    if (added) {
      // [row]
      setBOOKS(
        produce(BOOKS, (bs) => {
          _(added).forEach((rowAdded) => {
            const newId = _(BOOKS).keys().max() ?? 0 + 1;
            bs[newId] = { ...rowAdded, id: newId };
          });
        })
      );
    }

    if (changed) {
      // {id: row}
      setBOOKS(
        produce(BOOKS, (bs) => {
          _(changed)
            .toPairs()
            .forEach(([id, rowChanged]) => {
              bs[id] = { ...bs[id], ...rowChanged };
            });
        })
      );
    }

    if (deleted) {
      // [rowIdx]
      if (_.size(BOOKS) <= deleted.length) {
        return;
      }

      setBOOKS(
        produce(BOOKS, (bs) => {
          _(deleted).forEach((id) => {
            delete bs[id];
          });
        })
      );

      // cleanup the cart
      setCart(
        _(cart)
          .filter((id) => !deleted.includes(id))
          .value()
      );
    }
  }

  return (
    <ManagementView rows={rows} cols={cols} onCommitChanges={onCommitChanges} />
  );
}
