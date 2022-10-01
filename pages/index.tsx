import type { NextPage } from "next";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getStoredToken } from "../utils";

const Home: NextPage = () => {
  const links = [
    {
      name: "Journal",
      href: "/customer/journal",
    },
    {
      name: "Auth",
      href: "/auth",
    },
  ];
  const [name, setName] = useState<string>("");
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const { isLoading, refetch, error, data, status } = useQuery(
    "currentuser",
    () =>
      fetch("https://komo-backend.ignisda.tech/currentuser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getStoredToken()}`,
        },
      }).then((res) => res.json()),
    {
      enabled: true,
    }
  );
  const router = useRouter();
  useEffect(() => {
    if (getStoredToken()) {
      if (status === "success") {
        setSignedIn(true);
        setName(data.username);
      }
    } else {
      setSignedIn(false);
    }
  }, [data, status, refetch, router]);
  return (
    <>
      {!signedIn ? (
        <>
          <h1>Please sign in to continue</h1>
        </>
      ) : (
        status !== "error" && (
          <h1>
            Welcome <span className="font-bold">{name}</span>
          </h1>
        )
      )}
      <h1>Komo Home page</h1>
      {links.map((link, i) => (
        <Link key={i} href={link.href}>
          <a>{link.name}</a>
        </Link>
      ))}
    </>
  );
};

export default Home;
