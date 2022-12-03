import type { NextPage } from "next";
import { FC, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getStoredToken } from "../src/utils";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const SingleJournal: FC<{
  journalEntry?: any;
  onClose: () => void;
  isOpen: boolean;
}> = ({ journalEntry, onClose, isOpen }) => {
  const queryClient = useQueryClient();
  const addLink = useMutation(
    "addLink",
    async (newChild: number) => {
      const response = await fetch(
        `https://komo.jupeeter.tech/journal/links/${newChild}`,
        {
          method: "PUT",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${getStoredToken()}`,
          }),
          body: JSON.stringify({
            parent_id: journalEntry.id,
          }),
        }
      );
    },
    {
      onSuccess(data) {
        toast.success("Link added successfully");
        queryClient.refetchQueries({ queryKey: ["journal"], active: true });
        onClose();
      },
      onError(error) {
        toast.error("Error adding link");
      },
    }
  );
  if (!isOpen) return null;
  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        background: "#fafafa",
        top: 0,
        left: 0,
      }}
    >
      <div className="card-body">
        <h2 className="mt-8 card-title">{journalEntry.title}</h2>
        <h2 className="font-bold">{journalEntry.mood}</h2>
        <h2 className="mb-8">
          {new Date(journalEntry.date_created).toDateString()}
        </h2>
        <div className="font-bold">Reason</div>
        <p
          style={{
            height: "64px",
            overflowY: "scroll",
          }}
        >
          {journalEntry.reason}
        </p>
        <div className="font-bold">Reflection</div>
        <p
          style={{
            height: "92px",
            overflowY: "scroll",
          }}
        >
          {journalEntry.reflection}
        </p>
        <input
          type={"number"}
          placeholder={"link to another ↵"}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (e.currentTarget.value && (parseInt(e.currentTarget.value) > 0) && (parseInt(e.currentTarget.value) !== journalEntry.id))
                addLink.mutate(parseInt(e.currentTarget.value));
            }
          }}
          className={"input input-bordered my-4"}
        />
        <div className="card-actions">
          <button className="w-full btn btn-error" onClick={onClose}>
            Close Modal
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleJournal;
