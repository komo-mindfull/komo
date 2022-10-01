import Link from "next/link";
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
  return (
    <>
      <h1>Komo</h1>
      <ul className="w-56 menu bg-base-100">
        {links.map((link, i) => (
          <li key={i}>
            <Link href={link.href}>
              <a>{link.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default JournalIndex;
