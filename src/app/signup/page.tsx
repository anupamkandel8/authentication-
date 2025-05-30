"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

export default function SignupPage() {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  async function handleSignup() {
    await axios
      .post("/api/users/signup", user)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  }

  return (
    <>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        required
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="username">Username:</label>
      <input
        type="username"
        id="username"
        name="username"
        required
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        required
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button onClick={handleSignup} type="submit">
        Sign Up
      </button>
      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </>
  );
}
