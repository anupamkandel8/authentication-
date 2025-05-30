"use client";

import React from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import Link from "next/link";

export default function loginPage() {
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });

  function handleSubmit() {
    console.log("user", user);
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
    </div>
  );
}
