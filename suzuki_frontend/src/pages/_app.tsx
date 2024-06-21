import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnReconnect: true,
            retry: false,
            refetchOnMount: true,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const router = useRouter();
  const currentUrl = router.asPath;

  const noSidebarFooterUrls = [
    "/login",
    "/signup",
    "/",
  ];

  const displaySidebarFooter = !noSidebarFooterUrls.includes(currentUrl);

  return (
    <QueryClientProvider client={queryClient}>
      {displaySidebarFooter ? (
        <>
          <Toaster position="top-right" />
          <Component {...pageProps} />
        </>
      ) : (
        <>
          <Toaster position="top-right" />
          <Component {...pageProps} />
        </>

      )}
    </QueryClientProvider>
  );
}
