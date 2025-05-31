"use client";

import axios from "axios";
import { useState, useEffect } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get("/api/users/me")
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []); // empty array means run once when component mounts

  return (
    <>
      <div>Profile Page</div>
      <p>
        This is the profile page where users can view and edit their profile
        information.
      </p>
      <br />
      {user ? <div>{user.username}</div> : <div>Loading...</div>}
    </>
  );
};

export default ProfilePage;
