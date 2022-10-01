import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FC } from "react";
import { useMutation, useQuery } from "react-query";
import Loading from "../../../components/Loading";
import { getStoredToken } from "../../../utils";

enum Gender {
  male,
  female,
  others,
}

interface FormData {
  name: string;
  age: number;
  gender: Gender;
}

const CustomerUpdate: NextPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    age: 0,
    name: "",
    gender: Gender.female,
  });
  const getGender = () => {
    switch (formData.gender) {
      case Gender.female:
        return "female";
      case Gender.male:
        return "male";
      case Gender.others:
        return "others";
      default:
        return "female";
    }
  };
  const [checked, setChecked] = useState<boolean>(false);
  const mutation = useMutation("createCustomer", () =>
    fetch("https://komo-backend.ignisda.tech/users/customer", {
      method: "PUT",
      body: JSON.stringify({
        name: formData.name,
        age: formData.age,
        gender: getGender(),
      }),
      headers: new Headers({
        "content-type": "application/json",
        Authorization: `Bearer ${getStoredToken()}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
  );

  useEffect(() => {
    if (mutation.isSuccess) {
      router.push("/");
    }
  }, [router, mutation]);

  if (mutation.isLoading) return <Loading />;

  if (mutation.error) return <>An error has occurred: </>;

  return (
    <>
      <div className="text-2xl text-primary font-cursive">
        <h1>Profile Update</h1>
        <h1>Enter your details</h1>
      </div>
      <form className="w-full max-w-xs px-4 form-control">
        <label className="label" htmlFor="name">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          id="name"
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
        >
          <option value={Gender.male}>male</option>
          <option value={Gender.female}>female</option>
          <option value={Gender.others}>others</option>
        </select>
        <label className="mt-4 cursor-pointer label">
          <span className="label-text">confirm changes</span>
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
            mutation.mutate();
          }}
        >
          update profile
        </button>
      </form>
    </>
  );
};

export default CustomerUpdate;
