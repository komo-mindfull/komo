import "../styles/globals.css";
import "@fontsource/comfortaa";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { createContext, useContext, useState } from "react";
import { ToastContainer } from "react-toast";
import dayjs from "dayjs";

const queryClient = new QueryClient();

export interface journalentry {
  body: string;
  title: string;
  date_created: Date;
  id: number;
}

export type GlobalContent = {
  journalEntries: Array<journalentry>;
  setJournalEntries: (prev: Array<journalentry>) => void;
};

export const MyGlobalContext = createContext<GlobalContent>({
  journalEntries: [],
  setJournalEntries: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext);

function MyApp({ Component, pageProps }: AppProps) {
  const [journalEntries, setJournalEntries] = useState<Array<journalentry>>([]);
  return (
    <QueryClientProvider client={queryClient}>
      <MyGlobalContext.Provider value={{ journalEntries, setJournalEntries }}>
        <div className="grid h-screen place-items-center">
          <div className="mockup-phone">
            <div className="h-auto camera"></div>
            <div className="display">
              <div className="artboard artboard-demo phone-2">
                <Component {...pageProps} />
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </MyGlobalContext.Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
