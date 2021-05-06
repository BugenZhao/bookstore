import _ from "lodash";
import { UserType, useUsers } from "../services/auth";
import { ManagementView } from "./ManagementView";

export function UserManagementView() {
  const { users } = useUsers();
  const rows = _.values(users).map((user) => {
    return {
      id: user.user_id,
      admin: user.user_type === UserType.admin,
      ...user,
    };
  });
  const cols = [
    { name: "user_id", title: "User ID" },
    { name: "username", title: "Username" },
    { name: "admin", title: "Admin" },
  ];

  return (
    <ManagementView
      rows={rows}
      cols={cols}
      booleanCols={["admin"]}
      onCommitChanges={() => {}}
    ></ManagementView>
  );
}
