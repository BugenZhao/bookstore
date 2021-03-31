import _ from "lodash";
import { useState } from "react";
import { useStore } from "../services/StoreContext";
import { ManagementView } from "./ManagementView";

export function UserManagementView() {
  const { user: currentUser } = useStore();
  const [user, setUser] = useState(currentUser);

  const rows = [{ id: "0", user: user, active: true }];
  const cols = [
    { name: "user", title: "user" },
    { name: "active", title: "active" },
  ];

  return (
    <ManagementView
      rows={rows}
      cols={cols}
      booleanCols={["active"]}
      onCommitChanges={({ changed }) => {
        if (changed && changed.length > 0) {
          const newUser: string | undefined = _(changed).values().first().user;
          if (newUser) {
            setUser(newUser);
          }
        }
      }}
    ></ManagementView>
  );
}
