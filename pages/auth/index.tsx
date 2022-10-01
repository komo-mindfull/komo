import type { NextPage } from "next";
import { generateUsername } from "unique-username-generator";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FC } from "react";
import { useMutation, useQuery } from "react-query";

interface FormInterface {
  username?: string;
  password?: string;
}
const Auth: NextPage<{}> = ({}) => {
  // localStorage.removeItem("token");
  const router = useRouter();
  const [formData, setFormData] = useState<FormInterface>({
    password: "",
    username: "",
  });
  const fetchData = () => {
    const data = new FormData();
    data.append("username", formData.username as string | Blob);
    data.append("password", formData.password as string | Blob);
    const nice: Promise<Response> = fetch(
      "https://komo-backend.ignisda.tech/login",
      {
        method: "POST",
        body: data,
      }
    );
    return nice;
  };
  const mutation = useMutation(
    "login",
    () =>
      fetchData()
        .then((res) => {
          const data = res.json();
          return data;
        })
        .then((data) => {
          if (data.access_token) {
            localStorage.setItem("token", data.access_token);
          }
          return data;
        }),
    {
      onSuccess: (data, variables, context) => {
        router.push("/");
      },
    }
  );

  if (mutation.isLoading)
    return (
      <>
        <div className="inline-block w-24 h-24 border-t-8 rounded-full border-t-primary animate-spin"></div>
      </>
    );
  if (mutation.error) return <>An error has occurred: </>;
  return (
    <>
      <div className="text-4xl text-left text-primary font-cursive">
        <span>Welcome To</span>
        <h1>Komo</h1>
      </div>
      <div className="w-full max-w-xs px-4 form-control">
        <label className="label" htmlFor="username">
          <span className="label-text">username</span>
        </label>
        <input
          type="text"
          placeholder="username"
          name="username"
          id="username"
          className="w-full max-w-xs input input-bordered"
          value={formData.username}
          onChange={(e) => {
            setFormData({ ...formData, username: e.target.value });
          }}
        />
        <label className="label" htmlFor="password">
          <span className="label-text">password</span>
        </label>
        <input
          type="password"
          placeholder="password"
          className="w-full max-w-xs input input-bordered"
          maxLength={20}
          name="password"
          id="password"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />
        <button
          onClick={() => {
            mutation.mutate();
          }}
          className="w-full mt-4 rounded-full btn btn-primary"
        >
          Login
        </button>
        <button
          className="w-full mt-2 rounded-full btn"
          onClick={() => router.push("/auth/register")}
        >
          Register
        </button>
      </div>
    </>
  );
};

export default Auth;
