import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FC } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import Loading from "../../../components/Loading";
import { getStoredToken } from "../../../src/utils";

interface FormData {
  name: string;
  age: number;
  gender: string;
}

const Customer: NextPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    age: 17,
    name: "",
    gender: "male",
  });
  const [checked, setChecked] = useState<boolean>(false);
  const mutation = useMutation(
    "createCustomer",
    async () => {
      const response = await fetch("https://komo.jupeeter.tech/users/customer", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          age: formData.age,
          gender: formData.gender,
        }),
        headers: new Headers({
          "content-type": "application/json",
          Authorization: `Bearer ${getStoredToken()}`,
        }),
      });
      const data = await response.json();
      return data;
    },
    {
      onSuccess: (data) => {
        toast("creating new customer...", { duration: 2000 });
        router.push("/");
      },
      onError: (error) => {
        toast("Something went wrong", { duration: 2000 });
        console.log(error);
      },
    }
  );

  if (mutation.isLoading) return <Loading />;

  return (
    <>
      <div className="text-2xl text-primary font-cursive">
        <h1>Enter your details</h1>
      </div>
      <form className="w-full max-w-xs px-4 form-control">
        <label className="label" htmlFor="name">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
          name="name"
          placeholder="Your Name"
          className="w-full max-w-xs input input-bordered"
        />
        <label className="label" htmlFor="age">
          <span className="label-text">Age</span>
        </label>
        <input
          type="number"
          id="age"
          name="age"
          min={"14"}
          max="80"
          value={formData.age}
          onChange={(e) => {
            setFormData({ ...formData, age: parseInt(e.target.value) });
          }}
          placeholder="epic age"
          className="w-full max-w-xs input input-bordered"
        />
        <label className="mt-4 label">
          <span className="label-text">Gender</span>
        </label>
        <select
          className="w-full max-w-xs select"
          name="user-type"
          id="user-type"
          onChange={(e) => {
            setFormData({ ...formData, gender: e.target.value });
          }}
        >
          <option value={"male"}>male</option>
          <option value={"female"}>female</option>
          <option value={"others"}>others</option>
        </select>
        <label className="mt-4 cursor-pointer label">
          <span className="label-text">I agree to the terms of service</span>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
            required
            className="checkbox checkbox-primary"
          />
        </label>
        <button
          className="w-full mt-4 rounded-full btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            console.log(formData);
            if (!!formData.name && !!formData.age && !!formData.gender)
              mutation.mutate();
          }}
        >
          register
        </button>
      </form>
    </>
  );
};

export default Customer;
