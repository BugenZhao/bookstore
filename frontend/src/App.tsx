import { BSRoutes } from "./routes";

import { BooksProvider } from "./services/BooksContext";
import { StoreProvider } from "./services/StoreContext";

function App() {
  return (
    <BooksProvider>
      <StoreProvider>
        <BSRoutes />
      </StoreProvider>
    </BooksProvider>
  );
}

export default App;
