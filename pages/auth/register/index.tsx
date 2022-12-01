import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
  const mutation = useMutation(
    "register",
    async () => {
      const response = await fetch("https://komo.jupeeter.tech/users", {
        method: "POST",
        body: JSON.stringify({ ...formData, utype: "customer" }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data
    },
    {
      onSuccess: (data) => {
        toast.success(`${data.username} created! Please login to continue`, {
          icon: "👍",
          duration: 2000
        });
        router.push("/auth/");
      },
      onError: (error) => {
        toast.error("error occurred", {
          icon: "👎",
          duration: 2000
        });
      }
    }
  );
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
    username: generateUsername("", 0, 15),
    email: "",
    type: UserType.customer,
  });
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
        <button
          className="w-full mt-4 btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
        >
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
