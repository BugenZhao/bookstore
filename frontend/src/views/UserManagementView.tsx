import _ from "lodash";
import { ErrorModal } from "../components/ErrorModal";
import { useState } from "react";
import { patchUser, useUsers } from "../services/admin";
import { UserType } from "../services/auth";
import { DisplayCol, ManagementView } from "./ManagementView";

export function UserManagementView() {
  const { users, revalidate } = useUsers();

  const rows = _.values(users).map((user) => {
    return {
      admin: user.type === UserType.admin,
      ...user,
    };
  });

  type Row = typeof rows[number];

  const cols: DisplayCol<Row>[] = [
    { name: "id", title: "User ID" },
    { name: "username", title: "Username" },
    { name: "email", title: "Email" },
    { name: "admin", title: "Is admin" },
    { name: "banned", title: "Is banned" },
  ];

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
        showEditCommand
        rows={rows}
        cols={cols}
        booleanCols={["admin", "banned"]}
        onCommitChanges={async ({ changed }) => {
          let allPromises: Promise<Response>[] = [];

          if (changed) {
            const promises = _(changed)
              .entries()
              .filter(([_id, patch]) => !!patch)
              .map(([id, patch]) => {
                const data = {
                  type:
                    patch!.admin !== undefined
                      ? (patch!.admin as boolean)
                        ? UserType.admin
                        : UserType.normal
                      : undefined,
                  ...patch,
                };
                return patchUser(id, data);
              })
              .value();
            allPromises.push(...promises);
          }

          const responses = await Promise.all(allPromises);
          const failedOne = responses.find((r) => !r.ok);
          setErrorResponse(failedOne);
          setErrorShow(!!failedOne);

          await revalidate();
        }}
      />
    </>
  );
}
