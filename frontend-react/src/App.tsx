import { useState } from "react";
import useLocalStorage from "react-use-localstorage";
import { useImmer } from "use-immer";
import { BSRoutes } from "./routes";

import { ALL_BOOKS, BooksContext, StoreContext } from "./services";

function App() {
  const [cart, setCart] = useState([] as string[]);
  const addToCart = (id: string) => {
    setCart(cart.concat([id]));
  };
  const [user, setUser] = useLocalStorage("bz-user", "");

  const [BOOKS, updateBOOKS] = useImmer(ALL_BOOKS);

  return (
    <BooksContext.Provider value={{ BOOKS, updateBOOKS }}>
      <StoreContext.Provider
        value={{ cart, addToCart, setCart, user, setUser }}
      >
        <BSRoutes />
      </StoreContext.Provider>
    </BooksContext.Provider>
  );
}

export default App;
