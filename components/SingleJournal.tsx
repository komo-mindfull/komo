import type { NextPage } from "next";
import { FC, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getStoredToken } from "../src/utils";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const SingleJournal: FC<{
  journalEntry?: any;
  onClose: () => void;
  isOpen: boolean;
}> = ({ journalEntry, onClose, isOpen }) => {
  const addLink = useMutation(
    "addLink",
    async (newChild: number) => {
    //   throw Error("Not implemented");
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
        onClose();
      },
      onError(error) {
        toast.error("Error adding link");
      },
    }
  );
  if (!isOpen) return null;
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white shadow-xl card">
      <div className="card-body">
        <h2 className="mt-8 card-title">{journalEntry.title}</h2>
        {/* This is an accordian */}
        <div className="collapse">
          <input type="checkbox" />
          <div className="font-medium collapse-title">Reason</div>
          <div className="collapse-content">
            <p>{journalEntry.reason}</p>
          </div>
        </div>
        {/* end */}
        {/* This is an accordian */}
        <div className="collapse">
          <input type="checkbox" />
          <div className="font-medium collapse-title">Reflection</div>
          <div className="collapse-content">
            <p>{journalEntry.reflection}</p>
          </div>
        </div>
        {/* end */}
        <input
          type={"number"}
          placeholder={"link to another ↵"}
          onKeyDown={(e) => {
            console.log(e.currentTarget.value)
            if (e.key === "Enter") {
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