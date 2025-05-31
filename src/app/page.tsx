"use client";

import Link from "next/link";
import axios from "axios";

export default function Home() {

  function handleLogout() {
    axios.get("/api/users/logout")
      .then(response => {
        console.log(response.data); //temp code
      })
      .catch(error => {
        console.error("Error logging out:", error);
      });
  }

  return(

    <div>
      <h1>Welcome to the Home Page</h1>
      <Link href="/signup">Signup</Link> | <Link href="/login">Login</Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
