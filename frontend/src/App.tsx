import { BSRoutes } from "./routes";
import { StoreProvider } from "./services/StoreContext";

function App() {
  return (
    <StoreProvider>
      <BSRoutes />
    </StoreProvider>
  );
}

export default App;
