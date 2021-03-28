import { useState } from 'react';
import { useImmer } from "use-immer";
import { BSRoutes } from './routes';

import { ALL_BOOKS, BooksContext, StoreContext } from './services';


function App() {
  const [cart, setCart] = useState([] as number[]);
  const addToCart = (id: number) => { setCart(cart.concat([id])); };

  const [BOOKS, updateBOOKS] = useImmer(ALL_BOOKS);

  return (
    <BooksContext.Provider value={{ BOOKS, updateBOOKS }}>
      <StoreContext.Provider value={{ cart, addToCart, setCart }}>
        <BSRoutes />
      </StoreContext.Provider>
    </BooksContext.Provider>
  )
}

export default App;
