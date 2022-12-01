import Link from "next/link";
import { useRouter } from "next/router";
const JournalIndex = () => {
  const links = [
    {
      name: "All Your Entries",
      href: "/customer/journal/all",
    },
    {
      name: "Create New Entry",
      href: "/customer/journal/new",
    },
  ];
  const router = useRouter();
  return (
    <div className="relative flex flex-col justify-center w-full h-screen px-8">
      <button
        className="fixed top-0 left-0 m-8 text-4xl"
        onClick={() => router.push("/")}
      >
        🠔
      </button>
      <ul className="flex flex-col w-full gap-4 bg-base-100">
        {links.map((link, i) => (
          <li
            key={i}
            className="py-4 pl-6 pr-8 duration-150 rounded-full cursor-pointer hover:text-white hover:bg-primary-focus"
            onClick={() => router.push(link.href)}
          >
            {link.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JournalIndex;
