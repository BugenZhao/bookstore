import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import _ from "lodash";
import { useState } from "react";
import titleize from "titleize";
import { ErrorModal } from "../components/ErrorModal";
import { deleteBook, patchBook, putBook } from "../services/admin";
import { Book, useBooks } from "../services/book";
import { useCart } from "../services/cart";
import { DisplayCol, ManagementView } from "./ManagementView";

export function BookManagementView() {
  const { books, revalidate } = useBooks();
  const revalidateCart = useCart().revalidate;
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

  const [errorShow, setErrorShow] = useState(false);
  const [errorResponse, setErrorResponse] = useState<Response>();

  return (
    <>
      <ErrorModal modalShow={errorShow} setModalShow={setErrorShow}>
        {errorResponse ? (
          <>
            <h5>{`Error occurred while processing "${errorResponse.url}":`}</h5>
            <p>{`${errorResponse.status} ${errorResponse.statusText}`}</p>
          </>
        ) : null}
      </ErrorModal>
      <ManagementView
        showAddCommand
        showDeleteCommand
        showEditCommand
        rows={rows}
        cols={cols}
        onCommitChanges={async ({ added, changed, deleted }) => {
          let allPromises: Promise<Response>[] = [];

          if (added) {
            const promises = _(added)
              .map((item) => putBook(item))
              .value();
            allPromises.push(...promises);
          }

          if (changed) {
            const promises = _(changed)
              .entries()
              .filter(([_id, patch]) => !!patch)
              .map(([id, patch]) => patchBook(id, patch!))
              .value();
            allPromises.push(...promises);
          }

          if (deleted) {
            const promises = _(deleted)
              .map((id) => deleteBook(id.toString()))
              .value();
            allPromises.push(...promises);
          }

          const responses = await Promise.all(allPromises);
          const failedOne = responses.find((r) => !r.ok);
          setErrorResponse(failedOne);
          setErrorShow(!!failedOne);

          await Promise.all([revalidate(), revalidateCart()]);
        }}
      />
    </>
  );
}
