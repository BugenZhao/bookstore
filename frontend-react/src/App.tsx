import { useState } from "react";
import useLocalStorage from "use-local-storage";
import { BSRoutes } from "./routes";

import { ALL_BOOKS, BooksContext, StoreContext } from "./services";

function App() {
  const [cart, setCart] = useState([] as string[]);
  const addToCart = (id: string) => {
    setCart(cart.concat([id]));
  };
  const [user, setUser] = useLocalStorage("bz-user", "");

  const [BOOKS, setBOOKS] = useLocalStorage("bz-books", ALL_BOOKS);

  return (
    <BooksContext.Provider value={{ BOOKS, setBOOKS }}>
      <StoreContext.Provider
        value={{ cart, addToCart, setCart, user, setUser }}
      >
        <BSRoutes />
      </StoreContext.Provider>
    </BooksContext.Provider>
  );
}

export default App;
