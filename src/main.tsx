import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from "react-redux";
import { store } from "./store/store.tsx";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    display:block;
    margin: 0;
    font-family: sans-serif;
  }
`;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <GlobalStyle/>
    <App/>
    </Provider>
  </StrictMode>,
)
