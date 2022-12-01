import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import Loading from "../../../components/Loading";
import { getStoredToken } from "../../../src/utils";

enum Profession {
  counsellor,
  therapist,
  psychiatrist,
}

interface FormInterface {
  name: string;
  profession: Profession;
  yearsOfExperience: number;
  organisation: string;
}

const ExpertUpdate: NextPage = () => {
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormInterface>({
    yearsOfExperience: 0,
    name: "",
    profession: Profession.therapist,
    organisation: "",
  });
  const getProfession = () => {
    switch (formData.profession) {
      case Profession.counsellor:
        return "counsellor";
      case Profession.therapist:
        return "therapist";
      case Profession.psychiatrist:
        return "psychiatrist";
      default:
        return "therapist";
    }
  };
  const mutation = useMutation("registerExpert", () =>
    fetch("https://komo-backend.ignisda.tech/users/expert", {
      method: "PUT",
      body: JSON.stringify({
        name: formData.name,
        profession: getProfession(),
        yearsOfExperience: formData.yearsOfExperience,
        organisation: formData.organisation,
      }),
      headers: {
        Authorization: `Bearer ${getStoredToken()}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())
  );

  useEffect(() => {
    if (mutation.isSuccess) router.push("/expert/dashboard");
  }, [mutation, router]);

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
          placeholder="name"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
          className="w-full max-w-xs input input-bordered"
          required
        />
        <label className="label" htmlFor="profession">
          <span className="label-text">Profession</span>
        </label>
        <select
          className="w-full max-w-xs mt-4 select"
          name="profession"
          id="profession"
          value={formData.profession}
          onChange={(e) => {
            setFormData({ ...formData, profession: parseInt(e.target.value) });
          }}
        >
          <option value={Profession.psychiatrist}>psychiatrist</option>
          <option value={Profession.counsellor}>counsellor</option>
          <option value={Profession.therapist}>therapist</option>
        </select>
        <label className="label" htmlFor="organisation">
          <span className="label-text">Organisation</span>
        </label>
        <input
          type="text"
          placeholder="password"
          name="organisation"
          id="organisation"
          className="w-full max-w-xs input input-bordered"
          onChange={(e) => {
            setFormData({ ...formData, organisation: e.target.value });
          }}
          required
        />
        <label className="label">
          <span className="label-text">Proof of Practice</span>
        </label>
        <input
          type="file"
          placeholder="password"
          accept="image/jpeg,application/pdf"
          name="proof-of-practice"
          className="text-xs"
        />
        <label className="label" htmlFor="years-of-experience">
          <span className="label-text">Years of experience</span>
        </label>
        <input
          type="number"
          id="years-of-experience"
          name="years-of-experience"
          onChange={(e) => {
            e.preventDefault();
            setFormData({
              ...formData,
              yearsOfExperience: parseInt(e.target.value),
            });
          }}
          required
          placeholder="years of experience"
          min={"0"}
          max="30"
          className="w-full max-w-xs input input-bordered"
        />
        <label className="mt-4 cursor-pointer label">
          <span className="label-text">I agree to the terms of service</span>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
            className="checkbox checkbox-primary"
            required
          />
        </label>
        <button
          className="w-full mt-4 rounded-full btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
        >
          Login
        </button>
      </form>
    </>
  );
};

export default ExpertUpdate;
