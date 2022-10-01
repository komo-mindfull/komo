import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { generateUsername } from "unique-username-generator";
enum UserType {
  customer,
  expert,
  admin,
}

interface FormInterface {
  username?: string;
  password?: string;
  email?: string;
  type?: UserType;
}

const Register: NextPage = () => {
  const [checked, isChecked] = useState<boolean>(false);
  const mutation = useMutation("register", () =>
    fetch("https://komo-backend.ignisda.tech/users", {
      method: "POST",
      body: JSON.stringify({ ...formData, utype: returnUser() }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())
  );
  const returnUser = () => {
    switch (formData.type) {
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
  const [formData, setFormData] = useState({
    password: "",
    username: generateUsername("", 0, 15),
    email: "",
    type: UserType.customer,
  });
  useEffect(() => {
    if (mutation.isSuccess) {
      localStorage.setItem("token", mutation.data.access_token);
      router.push(`/auth/register/${returnUser()}`);
    }
  }, [mutation, router]);
  return (
    <>
      <div>
        <h1 className="mb-2 text-3xl text-primary">new user</h1>
      </div>
      <form className="w-full max-w-xs px-4 form-control">
        <label
          className="label"
          htmlFor="username"
          onClick={() => {
            setFormData({ ...formData, username: generateUsername("", 0, 15) });
          }}
        >
          <span className="label-text">
            username <span className="text-xs">(regenerate)</span>
          </span>
        </label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="username"
          value={formData.username}
          onChange={(e) => {
            setFormData({ ...formData, username: e.target.value });
          }}
          className="w-full max-w-xs input input-bordered"
        />
        <label className="label" htmlFor="email">
          <span className="label-text">email</span>
        </label>
        <input
          type="email"
          placeholder="nice@beautiful.com"
          id="email"
          name="email"
          className="w-full max-w-xs input input-bordered"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
        <label className="label" htmlFor="password">
          <span className="label-text">password</span>
        </label>
        <input
          type="password"
          placeholder="password"
          className="w-full max-w-xs input input-bordered"
          id="password"
          name="password"
          maxLength={20}
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />
        <select
          className="w-full max-w-xs mt-4 select"
          name="user-type"
          id="user-type"
          value={formData.type}
          onChange={(e) =>
            setFormData({ ...formData, type: parseInt(e.target.value) })
          }
        >
          <option value={UserType.customer}>customer</option>
          <option value={UserType.expert}>expert</option>
        </select>
        <button
          className="w-full mt-4 btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
        >
          Next
        </button>
      </form>
    </>
  );
};

export default Register;
