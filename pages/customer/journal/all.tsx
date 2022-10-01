import type { NextPage } from "next";
import { useState } from "react";
import { useQuery } from "react-query";
import { getStoredToken } from "../../../utils";
import dayjs from "dayjs";

enum Mood {
  happy,
  sad,
  angry,
  neutral,
}

interface JournalEntry {
  title: string;
  body: string;
  date_created: Date;
  id: number;
  mood?: Mood;
}

const Journal: NextPage = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [journalEntries, setJournalEntries] = useState<Array<JournalEntry>>([]);
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
      fetch("https://komo-backend.ignisda.tech/journal", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getStoredToken()}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
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
    <section className="flex flex-col w-full h-screen p-6">
      <h1 className="mt-12 text-xl border-t-4 text-primary border-t-gray-400 ">
        Komo
      </h1>
      <span>your mindfulness journal</span>
      <ul className="my-4 steps">
        {journalEntries.map((entry: JournalEntry, i) => {
          return (
            <li className={`step step-success`} data-content="" key={i}>
              {dayjs().add(i, "day").format("dd/DD")}
            </li>
          );
        })}
      </ul>
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
