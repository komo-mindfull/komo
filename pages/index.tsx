import type { NextPage } from "next";
import Link from "next/link";

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
  return (
    <>
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
