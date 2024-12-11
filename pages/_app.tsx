import Wrapper from "@/layout/wrapper/wrapper";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { CookiesProvider } from "react-cookie";


export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (

    <QueryClientProvider client={queryClient}>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <Wrapper>
        <Toaster position="top-right" reverseOrder={false} />
          <Component {...pageProps} />
        </Wrapper>
      </CookiesProvider>
    </QueryClientProvider>

  );
}
