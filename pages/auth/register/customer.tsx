import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { FC } from "react";
import { useQuery } from "react-query";

enum Gender {
  male,
  female,
  others,
}

const Customer: NextPage = () => {
  const router = useRouter();
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("https://api.github.com/repos/tannerlinsley/react-query").then(
      (res) => res.json()
    )
  );

  if (isLoading) return <>Loading...</>;

  if (error) return <>An error has occurred: </>;
  return (
    <>
      <div className="text-2xl text-primary font-cursive">
        <h1>Customer Registration</h1>
      </div>
      <div className="w-full max-w-xs px-4 form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          placeholder="username"
          className="w-full max-w-xs input input-bordered"
        />
        <label className="label">
          <span className="label-text">Age</span>
        </label>
        <input
          type="number"
          min={"14"}
          max="80"
          placeholder="epic age"
          className="w-full max-w-xs input input-bordered"
        />
        <label className="mt-4 label">
          <span className="label-text">Gender</span>
        </label>
        <select
          className="w-full max-w-xs select"
          name="user-type"
          id="user-type"
        >
          <option value={Gender.male}>male</option>
          <option value={Gender.female}>female</option>
          <option value={Gender.others}>others</option>
        </select>
        <label className="mt-4 cursor-pointer label">
          <span className="label-text">I agree to the terms of service</span>
          <input
            type="checkbox"
            checked
            className="checkbox checkbox-primary"
          />
        </label>
        <button
          className="w-full mt-4 rounded-full btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          register
        </button>
      </div>
    </>
  );
};

export default Customer;
