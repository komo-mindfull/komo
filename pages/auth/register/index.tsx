import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
enum UserType {
  customer,
  expert,
  admin,
}

const Register: NextPage = () => {
  const [userType, setuserType] = useState<UserType>(UserType.customer);
  const returnUser = () => {
    switch (userType) {
      case UserType.customer:
        return "customer";
      case UserType.expert:
        return "expert";
      case UserType.admin:
        return "admin";
      default:
        return "customer";
    }
  };
  const router = useRouter();
  return (
    <>
      <div>
        <h1>new user</h1>
      </div>
      <form className="w-full max-w-xs px-4 form-control">
        <label className="label">
          <span className="label-text">username</span>
        </label>
        <input
          type="text"
          placeholder="username"
          className="w-full max-w-xs input input-bordered"
        />
        <label className="label">
          <span className="label-text">email</span>
        </label>
        <input
          type="email"
          placeholder="nice@beautiful.com"
          className="w-full max-w-xs input input-bordered"
        />
        <label className="label">
          <span className="label-text">password</span>
        </label>
        <input
          type="password"
          placeholder="password"
          className="w-full max-w-xs input input-bordered"
        />
        <select
          className="w-full max-w-xs mt-4 select"
          name="user-type"
          id="user-type"
          value={userType}
          onChange={(e) => setuserType(parseInt(e.target.value))}
        >
          <option value={UserType.customer}>customer</option>
          <option value={UserType.expert}>expert</option>
        </select>
        <button
          className="w-full mt-4 btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            router.push(`/auth/register/${returnUser()}`);
          }}
        >
          Next
        </button>
      </form>
    </>
  );
};

export default Register;
