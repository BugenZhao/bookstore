import _ from "lodash";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";

// import produce from "immer";
import { DisplayCol, ManagementView } from "./ManagementView";
import titleize from "titleize";
import { Book, useBooks } from "../services/book";
import { patchBook, putBook } from "../services/admin";

export function BookManagementView() {
  const { books, revalidate } = useBooks();
  const rows = _.values(books);

  type Row = Book;
  const cols: DisplayCol<Row>[] = ([
    "id",
    "isbn",
    "name",
    "type",
    "author",
    "price",
    "description",
    "inventory",
    "image",
  ] as (keyof Row)[]).map((k) => {
    return { name: k, title: titleize(k) };
  });

  return (
    <ManagementView
      showAddCommand
      showDeleteCommand
      showEditCommand
      rows={rows}
      cols={cols}
      onCommitChanges={async ({ added, changed, deleted }) => {
        if (added) {
          const promises = _(added)
            .map((item) => putBook(item))
            .value();
          await Promise.all(promises);
        }

        if (changed) {
          const promises = _(changed)
            .entries()
            .filter(([_id, patch]) => !!patch)
            .map(([id, patch]) => patchBook(id, patch!))
            .value();
          await Promise.all(promises);
        }

        if (deleted) {
          // [rowIdx]
          // if (_.size(BOOKS) <= deleted.length) {
          //   return;
          // }
          // setBOOKS(
          //   produce(BOOKS, (bs) => {
          //     _(deleted).forEach((id) => {
          //       delete bs[id];
          //     });
          //   })
          // );
          // clearCart();
        }
        await revalidate();
      }}
    />
  );
}
