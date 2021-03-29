import { createContext, PropsWithChildren, useContext, useState } from "react";
import useLocalStorage from "use-local-storage";

type StoreContextType = {
  cart: string[];
  addToCart: (id: string) => void;
  setCart: (newCart: string[]) => void;
  user: string;
  setUser: (user: string) => void;
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

  return (
    <StoreContext.Provider value={{ cart, addToCart, setCart, user, setUser }}>
      {props.children}
    </StoreContext.Provider>
  );
}
