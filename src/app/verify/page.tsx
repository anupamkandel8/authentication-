"use client";

import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function VerifyTokenPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isVarified, setIsVarified] = useState(false);

  async function handleVerifyToken() {
    await axios.post("/api/users/verify", { token })
    .then((response) => {
      if (response.status === 200) {
        setIsVarified(true);
       // router.push("/login");
      }
      console.log("message from verify backend:", response.data.message); // Log the success message
      console.log("error from verify backend:", response.data.error); // Log any error message
    });
  }

  useEffect(() => {
    //token is taken from url
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
    console.log("Token received on frontend:", token); // Log the token for debugging
  }, []);

  useEffect(() => {
    handleVerifyToken();
  }, [token]);

  return (
    <div>
      <h1>Verify Token Page</h1>
      {isVarified ? (
        <p>Your email has been verified successfully!</p>
      ) : (
        <p>Verifying your email...</p>
      )}
    </div>
  );
}
