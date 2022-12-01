import type { NextPage } from "next";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { links } from "../src/links";
import { getStoredToken } from "../src/utils";

const Home: NextPage = () => {
  
  const [user, setUser] = useState<any>({});
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const { isLoading, refetch, error, data, status } = useQuery(
    "currentUser",
    async () => {
      console.log("fetching current user");
      const response = await fetch("https://komo.jupeeter.tech/currentuser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getStoredToken()}`,
        },
      });
      const data = await response.json();
      return data;
    },
    {
      enabled: false,
      onSuccess: (data) => {
        setUser(data);
      },
    }
  );
  const router = useRouter();
  useEffect(() => {
    if (getStoredToken()) {
      refetch();
      setSignedIn(true);
    } else {
      router.push("/auth");
    }
  }, [refetch, router]);
  return (
    <section className="flex flex-col items-center justify-center w-full h-screen">
      <div className="flex items-center justify-center gap-2">
        <h1 className="text-4xl text-primary">Komo </h1>
        {signedIn && (
          <span className="px-2 font-bold text-white rounded-full bg-primary">
            {user.utype}
          </span>
        )}
      </div>
      {!signedIn ? (
        <>
          <h1>Please sign in to continue</h1>
        </>
      ) : (
        status !== "error" && (
          <>
            <h1>
              Welcome <span className="mt-4 font-bold">{user.username}</span>
            </h1>
          </>
        )
      )}
      <ul className="flex flex-col w-56 gap-2 my-4 bg-base-100">
        {links.map((link, i) => {
          const isHidden =
            (link.name === "Dashboard" && user.utype === "customer") ||
            (link.name === "Journal" && user.utype === "expert");

          if (link.name === "Profile Update")
            link.href = "/auth/update/" + user.utype;

          return (
            <li
              key={i}
              className={
                `py-2 text-center duration-150 rounded-full cursor-pointer hover:text-white hover:bg-primary-focus outline-2 outline outline-primary` +
                ` ${isHidden ? "hidden" : ""}`
              }
              onClick={() => router.push(link.href)}
            >
              <a>{link.name}</a>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Home;
