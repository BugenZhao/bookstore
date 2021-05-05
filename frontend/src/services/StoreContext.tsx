import { createContext, PropsWithChildren, useContext, useState } from "react";
import _ from "lodash";

export const ADMINS = ["Bugen", "Admin"];

export type Cart = Record<string, number>;
type StoreContextType = {
  clearCart: () => void;
  signedOut: boolean;
  setSignedOut: (s: boolean) => void;
};
export const StoreContext = createContext<StoreContextType>(null!);
export function useStore() {
  return useContext(StoreContext);
}

export function StoreProvider(props: PropsWithChildren<{}>) {
  const [signedOut, setSignedOut] = useState(false);

  return (
    <StoreContext.Provider
      value={{
        clearCart: () => {},
        signedOut,
        setSignedOut,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
}
