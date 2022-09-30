import "../styles/globals.css";
import "@fontsource/comfortaa";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid place-items-center h-screen">
        <div className="mockup-phone">
          <div className="camera h-auto"></div>
          <div className="display">
            <div className="artboard artboard-demo phone-2">
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </div>
      {/* <main className="w-full h-screen bg-green-300 flex justify-center font-cursive">
        <section className="bg-slate-50 h-screen w-[480px] shadow-2xl">
          <Component {...pageProps} />
        </section>
      </main> */}
    </QueryClientProvider>
  );
}

export default MyApp;
