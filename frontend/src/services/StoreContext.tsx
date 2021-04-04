import { createContext, PropsWithChildren, useContext, useState } from "react";
import useLocalStorage from "use-local-storage";
import _ from "lodash";
import produce from "immer";

export const ADMINS = ["Bugen", "Admin"];

export type Cart = Record<string, number>;
type StoreContextType = {
  cart: Cart;
  addToCart: (id: string) => void;
  setCart: (c: Cart) => void;
  clearCart: () => void;
  getCartCount: () => number;
  user: string;
  setUser: (u: string) => void;
  isSignedIn: boolean;
  isAdmin: boolean;
  signedOut: boolean;
  setSignedOut: (s: boolean) => void;
};
export const StoreContext = createContext<StoreContextType>(null!);
export function useStore() {
  return useContext(StoreContext);
}

export function StoreProvider(props: PropsWithChildren<{}>) {
  const [cart, setCart] = useState({} as _.Dictionary<number>);
  const addToCart = (id: string) => {
    setCart(
      produce(cart, (cart) => {
        const count = cart[id] ?? 0;
        cart[id] = count + 1;
      })
    );
  };
  const clearCart = () => setCart({});
  const getCartCount = () => _(cart).values().sum();

  const [user, setUser] = useLocalStorage("bz-user", "");
  const isSignedIn = user !== "";
  const isAdmin = ADMINS.includes(user);

  const [signedOut, setSignedOut] = useState(false);

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        setCart,
        clearCart,
        getCartCount,
        user,
        setUser,
        isSignedIn,
        isAdmin,
        signedOut,
        setSignedOut,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
}
