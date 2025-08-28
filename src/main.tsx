// App entry: mounts React with Redux and React Query providers,
// and injects a minimal global style baseline.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { createGlobalStyle } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const GlobalStyle = createGlobalStyle`
  body {
    display:block;
    margin: 0;
    font-family: sans-serif;
    toastify-toast-padding:3px;
  }
`;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Provider order: Redux (global state) → React Query (server state) → App */}
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <App />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
