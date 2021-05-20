import _ from "lodash";
import { useUsers } from "../services/admin";
import { UserType } from "../services/auth";
import { ManagementView } from "./ManagementView";

export function UserManagementView() {
  const { users } = useUsers();
  const rows = _.values(users).map((user) => {
    return {
      admin: user.type === UserType.admin,
      ...user,
    };
  });
  const cols = [
    { name: "id", title: "User ID" },
    { name: "username", title: "Username" },
    { name: "email", title: "Email" },
    { name: "admin", title: "Is admin" },
    { name: "banned", title: "Is banned" },
  ];

  return (
    <ManagementView
      rows={rows}
      cols={cols}
      booleanCols={["admin", "banned"]}
      onCommitChanges={(change) => {
        console.log(change);
      }}
    ></ManagementView>
  );
}
