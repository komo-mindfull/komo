import type { NextPage } from "next";
import { Tab, Menu, Listbox } from "@headlessui/react";
import { useState } from "react";
import { FC } from "react";
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
  return (
    <section className="font-bold">
      <Listbox value={userType} onChange={setuserType}>
        <Listbox.Button>You are {returnUser()}</Listbox.Button>
        <Listbox.Options>
          <Listbox.Option value={UserType.customer}>Customer</Listbox.Option>
          <Listbox.Option value={UserType.admin}>Admin</Listbox.Option>
          <Listbox.Option value={UserType.expert}>Expert</Listbox.Option>
        </Listbox.Options>
      </Listbox>
      <Tab.Group>
        <Tab.List>
          <Tab className={"block"}>Login</Tab>
          {userType !== UserType.admin && (
            <Tab className={"block"}>register</Tab>
          )}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            Login Form
            <LoginForm />
          </Tab.Panel>
          <Tab.Panel>
            Register Form
            <RegisterForm />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </section>
  );
};

const RegisterForm: FC = () => {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("https://api.github.com/repos/tannerlinsley/react-query").then(
      (res) => res.json()
    )
  );

  if (isLoading) return <>Loading...</>;

  if (error) return <>An error has occurred: </>;

  return (
    <form>
      <label htmlFor="username">username</label>
      <input type="text" name="username" id="username" />
      <label htmlFor="password">password</label>
      <input type="password" name="password" id="password" />
      <button
        onClick={(e) => {
          e.preventDefault();
        }}
        className="btn"
      >
        Register
      </button>
    </form>
  );
};

const LoginForm: FC = () => {
  return (
    <form>
      <label htmlFor="username">username</label>
      <input type="text" name="username" id="username" />
      <label htmlFor="password">password</label>
      <input type="password" name="password" id="password" />
      <button onClick={() => {}}>Login</button>
    </form>
  );
};

export default Register;
