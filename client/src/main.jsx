import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/Authcontext.jsx";
import { SearchProvider } from "./context/Searchcontext.jsx";
import { CartcontextProvider } from "./context/Cartcontext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <SearchProvider>
      <CartcontextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartcontextProvider>
    </SearchProvider>
  </AuthContextProvider>,
);
