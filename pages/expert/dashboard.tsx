import { NextPage } from "next";
import { useRouter } from "next/router";

const Dashboard: NextPage = () => {
  const router = useRouter();
  return (
    <div className="relative w-full h-screen px-8 py-20 text-white bg-primary">
      <button
        className="absolute top-0 left-0 m-8 text-4xl "
        onClick={() => router.push("/")}
      >
        🠔
      </button>
      <h1 className="text-4xl font-bold">Dashboard</h1>
    </div>
  );
};

export default Dashboard;
