import axi from "config/axios";
import { Button, Spinner, TextField } from "gestalt";
import useAuth from "hooks/useAuth";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";

export default function Register() {
  // !TODO:  add validation and error messages

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleLogin = useMutation(() => axi.post("/create", data), {
    onError: (err) => {
      console.log(err.response);
    },
    onSuccess: (data) => {
      Router.push("/");
    },
  });

  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading) {
    return (
      <div className="mt-10">
        <Spinner show accessibilityLabel="Loading..." />
      </div>
    );
  }

  if (isLoggedIn) {
    Router.replace("/");
    return (
      <div className="mt-10">
        <Spinner show accessibilityLabel="Loading..." />
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg max-w-lg mx-auto p-5 mt-10">
      <span className="block text-center text-2xl mb-5 font-semibold">
        Create Account
      </span>
      <TextField
        onChange={({ value }) => handleChange("name", value)}
        placeholder="wassim"
        label="Name"
        //   errorMessage={!data.email ? "write your email" : ""}
        //  value={value}
        type="text"
      />
      <br />
      <br />
      <TextField
        onChange={({ value }) => handleChange("email", value)}
        placeholder="name@mail.com"
        label="Email"
        //   errorMessage={!data.email ? "write your email" : ""}
        //  value={value}
        type="email"
      />
      <br />
      <br />
      <TextField
        onChange={({ value }) => handleChange("password", value)}
        placeholder="*********"
        label="Password"
        //   errorMessage={!data.password ? "please write your password" : ""}
        //  value={value}
        type="password"
      />

      <br />
      <br />

      <button
        className={`
         bg-blue-600 rounded-full w-full text-white font-semibold px-5 py-2 block
         ${
           !data.email || !data.password || !data.name
             ? "opacity-70"
             : "cursor-pointer hover:opacity-80"
         }
      `}
        onClick={() => {
          if (!data.email || !data.password || !data.name) {
            return false;
          }

          handleLogin.mutate();
        }}
      >
        Submit
      </button>
    </div>
  );
}
