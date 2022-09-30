import "../styles/globals.css";
import "@fontsource/comfortaa";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const inValidateLogin = () => {
    queryClient.invalidateQueries("login");
  }
  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid h-screen place-items-center">
        <div className="mockup-phone">
          <div className="h-auto camera"></div>
          <div className="display">
            <div className="artboard artboard-demo phone-2">
              <Component {...pageProps} invalidateLogin={inValidateLogin} />
            </div>
          </div>
        </div>
      </div>
      {/* <main className="flex justify-center w-full h-screen bg-green-300 font-cursive">
        <section className="bg-slate-50 h-screen w-[480px] shadow-2xl">
          <Component {...pageProps} />
        </section>
      </main> */}
    </QueryClientProvider>
  );
}

export default MyApp;
