import { createContext, PropsWithChildren, useContext, useState } from "react";
import _ from "lodash";

type StoreContextType = {
  signedOut: boolean;
  setSignedOut: (s: boolean) => void;
};
export const StoreContext = createContext<StoreContextType>(undefined!);
export function useStore() {
  return useContext(StoreContext);
}

export function StoreProvider(props: PropsWithChildren<{}>) {
  const [signedOut, setSignedOut] = useState(false);

  return (
    <StoreContext.Provider
      value={{
        signedOut,
        setSignedOut,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
}
