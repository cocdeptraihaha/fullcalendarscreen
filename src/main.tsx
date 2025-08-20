// App entry: mounts React with Redux and React Query providers,
// and injects a minimal global style baseline.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from "react-redux";
import { store } from "./store/store.tsx";
import { createGlobalStyle } from "styled-components";
import { QueryProvider } from './providers/QueryProviders.tsx';

const GlobalStyle = createGlobalStyle`
  body {
    display:block;
    margin: 0;
    font-family: sans-serif;
  }
`;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Provider order: Redux (global state) → React Query (server state) → App */}
    <Provider store={store}>
    <QueryProvider>
        <GlobalStyle/>
        <App/>
      </QueryProvider>
    </Provider>
  </StrictMode>,
)
