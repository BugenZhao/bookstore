import { Routes } from "./routes";
import { StoreProvider } from "./services/StoreContext";

function App() {
  return (
    <StoreProvider>
      <Routes />
    </StoreProvider>
  );
}

export default App;
