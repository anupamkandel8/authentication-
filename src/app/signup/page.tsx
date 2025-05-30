"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
import Link from "next/link";

export default function SignupPage() {


  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  async function  handleSubmit() {
    console.log("user", user); 
    if (!user.username || !user.email || !user.password) {
      console.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post("/api/users/signup", user);
    
  
    } catch (error) {
      console.error("Error during signup:", error);
    }
  }

  return (
    <div >
      <h1>Signup Page</h1>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        placeholder="Username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
        <label htmlFor="email">Email</label>
        <input id="email"
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
        <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button onClick={handleSubmit} type="submit">Sign Up</button>
    <Link href="/login">Already have an account? Login</Link>
    </div>
  );
}
