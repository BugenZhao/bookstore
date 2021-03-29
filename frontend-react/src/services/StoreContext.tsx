import { createContext, PropsWithChildren, useContext, useState } from "react";
import useLocalStorage from "use-local-storage";

type StoreContextType = {
  cart: string[];
  addToCart: (id: string) => void;
  setCart: (c: string[]) => void;
  user: string;
  setUser: (u: string) => void;
  signedOut: boolean;
  setSignedOut: (s: boolean) => void;
};
export const StoreContext = createContext<StoreContextType>(null!);
export function useStore() {
  return useContext(StoreContext);
}

export function StoreProvider(props: PropsWithChildren<{}>) {
  const [cart, setCart] = useState([] as string[]);
  const addToCart = (id: string) => {
    setCart(cart.concat([id]));
  };

  const [user, setUser] = useLocalStorage("bz-user", "");

  const [signedOut, setSignedOut] = useState(false);

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        setCart,
        user,
        setUser,
        signedOut,
        setSignedOut,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
}
