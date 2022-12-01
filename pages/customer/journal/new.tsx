import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getStoredToken } from "../../../src/utils";
import { toast } from "react-toast";
import { useRouter } from "next/router";

const Journal: NextPage = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const mutation = useMutation("createJournal", () =>
    fetch("https://komo-backend.ignisda.tech/journal", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
      }),
      headers: new Headers({
        Authorization: `Bearer ${getStoredToken()}`,
        "content-type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => data)
  );
  const router = useRouter();
  useEffect(() => {
    if (mutation.status !== "idle") {
      if (mutation.isSuccess) {
        toast.success("Journal entry created successfully");
        router.push("/customer/journal/all");
      }
    }
  });
  return (
    <section className="flex flex-col w-full h-screen p-6">
      <h1 className="mt-12 text-xl border-t-4 text-primary border-t-gray-400 ">
        Komo
      </h1>
      <span>your mindfulness journal</span>
      <input
        type="text"
        className="w-full mt-2 border-none outline-none"
        name="title"
        id="title"
        placeholder="Entry Title"
        maxLength={50}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        name="entry"
        id="entry"
        rows={15}
        placeholder="It was a very good day. That gal was looking very fine"
        className="flex-shrink-0 w-full border-none outline-none"
        maxLength={400}
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
        }}
      />
      {body.length !== 0 && title.length !== 0 && (
        <button
          className="btn btn-sm"
          onClick={() => {
            mutation.mutate();
          }}
        >
          submit
        </button>
      )}
    </section>
  );
};

export default Journal;
