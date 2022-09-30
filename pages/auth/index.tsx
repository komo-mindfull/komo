import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { FC } from "react";
import { useQuery } from "react-query";

const Auth: NextPage = () => {
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
        <span>Welcome To</span>
        <h1>Komo</h1>
      </div>
      <div className="w-full max-w-xs px-4 form-control">
        <label className="label">
          <span className="label-text">username</span>
        </label>
        <input
          type="text"
          placeholder="username"
          className="w-full max-w-xs input input-bordered"
        />
        <label className="label">
          <span className="label-text">password</span>
        </label>
        <input
          type="text"
          placeholder="password"
          className="w-full max-w-xs input input-bordered"
        />
        <button className="w-full mt-4 btn btn-primary">Login</button>
        <button
          className="w-full mt-2 btn"
          onClick={() => router.push("/auth/register")}
        >
          Register
        </button>
      </div>
    </>
  );
};

export default Auth;
