/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import type { NextPage } from "next";
import { toast } from "react-hot-toast";
import { getStoredToken } from "../../../src/utils";
import { useMutation, useQueryClient } from "react-query";
const Journal: NextPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  return (
    <section className="flex flex-col justify-center w-full h-screen p-6">
      <button
        className="fixed top-0 left-0 m-8 text-4xl"
        onClick={() => router.push("/customer/journal")}
      >
        🠔
      </button>
      <Step step={step} setStep={setStep} />
    </section>
  );
};

type moodType = "happy" | "sad" | "nervous" | "anxious";

interface JournalEntry {
  title: string;
  mood: moodType;
  reflection: string;
  reason: string;
  link: number | undefined;
}

const Step: FC<{
  step: number;
  setStep: (nice: (x: number) => number) => void;
}> = ({ step, setStep }) => {
  const router = useRouter();
  const [entry, setEntry] = useState<JournalEntry>({
    title: "",
    mood: "happy",
    reflection: "",
    reason: "",
    link: 0,
  });
  const queryClient = useQueryClient();
  const mutation = useMutation(
    "createJournal",
    async () => {
      const response = await fetch("https://komo.jupeeter.tech/journal", {
        method: "POST",
        body: JSON.stringify({
          title: entry.title,
          mood: entry.mood,
          reflection: entry.reflection,
          reason: entry.reason,
          link_ids: entry.link == 0 ? undefined : entry.link,
        }),
        headers: new Headers({
          Authorization: `Bearer ${getStoredToken()}`,
          "Content-Type": "application/json",
        }),
      });
      const data = await response.json();
      return data;
    },
    {
      onSuccess: () => {
        toast.success("Journal entry created!");
        queryClient.refetchQueries({ queryKey: ["journal"], active: true });
        router.push("/customer/journal/all");
      },
    }
  );
  switch (step) {
    case 1:
      return (
        <div className="w-full shadow-xl card bg-base-100">
          <div className="card-body">
            <h2 className="card-title">Title your journal</h2>
            <input
              className="p-4 input input-bordered"
              placeholder="Epic Title"
              value={entry.title}
              onChange={(e) => {
                setEntry((old) => ({ ...old, title: e.target.value }));
              }}
            />
            <div className="card-actions">
              <button
                className="w-full btn btn-primary"
                onClick={() =>
                  !!entry.title && setStep((old: number) => old + 1)
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="w-full shadow-xl card bg-base-100">
          <div className="card-body">
            <h2 className="card-title">How are you feeling today?</h2>
            <div className="card-actions">
              <button
                className="w-full btn btn-primary"
                onClick={() => {
                  setEntry((old) => ({ ...old, mood: "happy" }));
                  setStep((old) => old + 1);
                }}
              >
                Happy
              </button>
              <button
                className="w-full btn btn-error"
                onClick={() => {
                  setEntry((old) => ({ ...old, mood: "sad" }));
                  setStep((old) => old + 1);
                }}
              >
                Sad
              </button>
              <button
                className="w-full btn btn-warning"
                onClick={() => {
                  setEntry((old) => ({ ...old, mood: "nervous" }));
                  setStep((old) => old + 1);
                }}
              >
                Nervous
              </button>
              <button
                className="w-full btn btn-gray-300"
                onClick={() => {
                  setEntry((old) => ({ ...old, mood: "anxious" }));
                  setStep((old) => old + 1);
                }}
              >
                Anxious
              </button>
              <div className="divider"></div>
              <button
                className="w-full btn btn-warning"
                onClick={() => setStep((old: number) => old - 1)}
              >
                prev
              </button>
            </div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="w-full shadow-xl card bg-base-100">
          <div className="card-body">
            <h2 className="card-title">Why do you feel {entry.mood}?</h2>
            <textarea
              className="p-4 textarea-bordered textarea"
              placeholder="type something"
              value={entry.reason}
              onChange={(e) => {
                setEntry((old) => ({ ...old, reason: e.target.value }));
              }}
              rows={5}
            />
            <div className="card-actions">
              <button
                className="w-full btn btn-primary"
                onClick={() =>
                  !!entry.reason && setStep((old: number) => old + 1)
                }
              >
                Next
              </button>
              <button
                className="w-full btn btn-warning"
                onClick={() => setStep((old: number) => old - 1)}
              >
                prev
              </button>
            </div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="w-full shadow-xl card bg-base-100">
          <div className="card-body">
            <h2 className="card-title">Reflect on your thought</h2>
            <textarea
              className="p-4 textarea-bordered textarea"
              placeholder="type something"
              value={entry.reflection}
              onChange={(e) => {
                setEntry((old) => ({ ...old, reflection: e.target.value }));
              }}
              rows={5}
            />
            <div className="card-actions">
              <button
                className="w-full btn btn-primary"
                onClick={() => setStep((old: number) => old + 1)}
              >
                Next
              </button>
              <button
                className="w-full btn btn-warning"
                onClick={() => setStep((old: number) => old - 1)}
              >
                prev
              </button>
            </div>
          </div>
        </div>
      );
    case 5:
      return (
        <div className="w-full shadow-xl card bg-base-100">
          <div className="card-body">
            <h2 className="card-title">Link this journal to another</h2>
            <input
              className="p-4 input input-bordered"
              placeholder="Journal Id"
              type={"number"}
              value={entry.link}
              onChange={(e) => {
                if (e.target.value === "") {
                  setEntry((old) => ({
                    ...old,
                    link: 0,
                  }));
                  return;
                }
                setEntry((old) => ({
                  ...old,
                  link: parseInt(e.target.value),
                }));
              }}
            />
            <div className="card-actions">
              <button
                className="w-full btn btn-primary"
                onClick={() => {
                  console.log(entry);
                  mutation.mutate();
                }}
              >
                Submit
              </button>
              <button
                className="w-full btn btn-warning"
                onClick={() => setStep((old: number) => old - 1)}
              >
                prev
              </button>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};
export default Journal;
