"use client";

import React from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import Link from "next/link";


export default function loginPage() {
const router = useRouter();
const [resMessage, setResMessage] = React.useState("");

  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });

  function handleSubmit() {
   const res = axios.post("/api/users/login", user)
    .then((response) => {
      setResMessage(response.data.message);
      if (response.status === 200) {
        router.push("/");
      }
    })
    .catch((error) => {
      console.error("Error logging in:", error);
      if (error.response) {
        setResMessage(error.response.data.message);
      } else {
        setResMessage("An error occurred");
      }
    });
  }

  return (
    <div>
      <h1>Login Page</h1>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        placeholder="Username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
 
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button onClick={handleSubmit} type="submit">
        Sign In
      </button>
      <Link href="/signup">Don't have an account? Signup</Link>
      <p>{resMessage}</p>
    </div>
  );
}
