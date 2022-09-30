import type { NextPage } from "next";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

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
  const { isLoading, refetch, error, data, status } = useQuery(
    "currentuser",
    () =>
      fetch("https://komo-backend.ignisda.tech/currentuser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token") as string).access_token
          }`,
        },
      }).then((res) => res.json()),
    {
      enabled: false,
    }
  );
  const router = useRouter();
  useEffect(() => {
    if (status === "success") if (data) setName(data.username);
    if (JSON.parse(localStorage.getItem("token") as string).access_token) {
      // token found
      refetch();
    } else {
      router.push("/auth");
    }
    console.log({ status, data });
  }, [data, status, refetch, router]);
  return (
    <>
      {status !== "error" && (
        <h1>
          Welcome <span className="font-bold">{name}</span>
        </h1>
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
