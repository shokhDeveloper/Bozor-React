import "./index.scss"  
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store, ContextProvider } from "./Settings";
import { CartProvider } from "react-use-cart";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient()
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <CartProvider>
          <ContextProvider>
            <QueryClientProvider client={queryClient}>
                <App/>
            </QueryClientProvider>
          </ContextProvider>
        </CartProvider>
      </Provider>
    </BrowserRouter>
   </React.StrictMode>
);
