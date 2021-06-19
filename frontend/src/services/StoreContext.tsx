import {
  createContext,
  PropsWithChildren,
  useContext,
} from "react";
import _ from "lodash";
import { useState } from "react";

export enum AuthStatus {
  NotLoggedIn,
  LoggedIn,
  LoggedOut,
  Expired,
  Banned,
}

type StoreContextType = {
  authStatus: AuthStatus;
  setAuthStatus: (a: AuthStatus) => void;
};
export const StoreContext = createContext<StoreContextType>(undefined!);
export function useStore() {
  return useContext(StoreContext);
}

export function StoreProvider(props: PropsWithChildren<{}>) {
  const [authStatus, setAuthStatus] = useState(AuthStatus.NotLoggedIn);

  return (
    <StoreContext.Provider
      value={{
        authStatus,
        setAuthStatus,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
}
