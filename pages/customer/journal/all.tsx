import type { NextPage } from "next";
import { useState } from "react";
import { useQuery } from "react-query";
import { getStoredToken } from "../../../src/utils";
import dayjs from "dayjs";
import { useGlobalContext, journalentry } from "../../_app";
import { useRouter } from "next/router";

enum Mood {
  happy,
  sad,
  angry,
  neutral,
}

const Journal: NextPage = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const { journalEntries, setJournalEntries } = useGlobalContext();
  const journalEntriesChunks: Array<Array<journalentry>> = [];
  for (let i = 0; i < journalEntries.length; i += 4) {
    const chunk = journalEntries.slice(i, i + 4);
    journalEntriesChunks.push(chunk);
  }
  const router = useRouter();
  const getMood = (userMood: Mood) => {
    switch (userMood) {
      case Mood.happy:
        return "happy";
      case Mood.sad:
        return "sad";
      case Mood.angry:
        return "angry";
      case Mood.neutral:
        return "neutral";
    }
  };
  const { isLoading, error, data, refetch, isFetched, status } = useQuery(
    "createJournal",
    () =>
      fetch("https://komo.jupeeter.tech/journal", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getStoredToken()}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          data = data.map((entry: any) => {
            entry.date_created = dayjs(entry.date_created);
            return entry;
          });
          setJournalEntries(data);
          return data;
        })
  );
  const randomColor = () => {
    switch (Math.floor(Math.random() * 4)) {
      case 0:
        return "step-success";
      case 1:
        return "step-success";
      case 2:
        return "step-success";
      case 3:
        return "step-error";
      default:
        return "step-neutral";
    }
  };
  return (
    <section className="relative flex flex-col w-full h-screen p-6">
      <button
        className="absolute top-0 left-0 m-8 text-4xl"
        onClick={() => router.push("/")}
      >
        🠔
      </button>
      <h1 className="mt-12 text-xl border-t-4 text-primary border-t-gray-400 ">
        Komo
      </h1>
      <span>your mindfulness journal</span>
      {journalEntriesChunks.map((chunk, index) => (
        <ul key={index} className="my-4 steps">
          {chunk.map((entry, i) => {
            return (
              <li
                className={`step step-success cursor-pointer`}
                data-content=""
                key={i}
                onClick={() => {
                  router.push("/customer/journal/" + entry.id);
                }}
              >
                {/* @ts-ignore */}
                {entry.date_created.format("DD/MM")}
              </li>
            );
          })}
        </ul>
      ))}
      {body.length !== 0 && title.length !== 0 && (
        <button
          className="btn btn-sm"
          onClick={() => {
            refetch();
          }}
        >
          submit
        </button>
      )}
    </section>
  );
};
export default Journal;
