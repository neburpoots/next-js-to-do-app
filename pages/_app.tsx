import { AppProps } from "next/app";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";
import { ToastContainer } from 'react-nextjs-toast'

const queryClient = new QueryClient();

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default App;
