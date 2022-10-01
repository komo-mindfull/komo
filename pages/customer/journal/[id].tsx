import type { NextPage } from "next";
import { useRouter } from "next/router";
const JournalEntry: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <h1>Journal Entry</h1>
      <h1>{id}</h1>
    </>
  );
};

export default JournalEntry;
