import { createContext, PropsWithChildren, useContext, useState } from "react";
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

  const [signedOut, setSignedOut] = useState(false);

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        setCart,
        clearCart,
        getCartCount,
        signedOut,
        setSignedOut,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
}
