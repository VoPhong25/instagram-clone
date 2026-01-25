import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";


import App from "./App";
import { store } from "./Redux/Store/Store";
import { StompProvider } from "./WebSocket/WebSocket";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* Để resetCSS={false} ở đây để Chakra không đánh nhau với Tailwind */}
      <ChakraProvider resetCSS={false}>
        <Provider store={store}>
          <StompProvider>
             {/* XÓA ThemeProvider của MUI ở đây */}
             <App />
          </StompProvider>
        </Provider>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);