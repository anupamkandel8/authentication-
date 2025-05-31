"use client";

import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function VerifyTokenPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isVarified, setIsVarified] = useState(false);

  function handleVerifyToken() {
    axios.post("/api/users/verifytoken", { token });
  }

  useEffect(() => {
    //token is taken from url
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    handleVerifyToken();
  }, [token]);

  return <div>{isVarified && <h1>User varified</h1>}</div>;
}
