import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useGlobalContext } from "../../_app";
const JournalEntry: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { journalEntries } = useGlobalContext();
  const entry = journalEntries.find(
    (entry) => entry.id === parseInt(id as string)
  );
  return (
    <>
      <section className="relative w-full h-full p-8 py-16">
        <button
          className="absolute top-0 left-0 m-8 text-4xl"
          onClick={() => router.push("/customer/journal/all")}
        >
          🠔
        </button>
        <h1 className="my-2 text-xl text-left text-primary">{entry?.title}</h1>
        <p className="h-full text-4xl break-words">{entry?.body}</p>
      </section>
    </>
  );
};

export default JournalEntry;
