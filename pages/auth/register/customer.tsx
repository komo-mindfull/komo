import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FC } from "react";
import { useQuery } from "react-query";

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

const Customer: NextPage = () => {
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
  const { isLoading, error, data, refetch, isFetched, status } = useQuery(
    "createCustomer",
    () =>
      fetch("https://komo-backend.ignisda.tech/users/customer", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          age: formData.age,
          gender: getGender(),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          return data;
        }),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (isFetched) {
      if (status === "success") {
        router.push("/");
      }
    }
  }, [status, isFetched, router]);

  if (isLoading) return <>Loading...</>;

  if (error) return <>An error has occurred: </>;

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
          name="name"
          placeholder="username"
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
            refetch();
          }}
        >
          register
        </button>
      </form>
    </>
  );
};

export default Customer;
