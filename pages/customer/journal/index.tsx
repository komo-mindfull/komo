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
        className="absolute top-0 left-0 m-8 text-4xl"
        onClick={() => router.push("/customer/journal/all")}
      >
        🠔
      </button>
      <ul className="w-56 menu bg-base-100">
        {links.map((link, i) => (
          <li
            key={i}
            className="duration-150 rounded-full hover:text-white hover:bg-primary-focus"
          >
            <Link href={link.href}>
              <a>{link.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JournalIndex;
