import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from './Context/ContextProvide';

const theme = extendTheme({
  shadows: {
    outline: '0 0 0 3px rgba(66, 153, 225, 0.6)',
    card: '0px 2px 8px rgba(0, 0, 0, 0.1)',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <ContextProvider> {/* Wrap the ContextProvider around your components */}
        <App />
      </ContextProvider>
    </ChakraProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
