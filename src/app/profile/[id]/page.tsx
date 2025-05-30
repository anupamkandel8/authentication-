 "use client";

import React from "react";
import { useParams } from "next/navigation";

const ProfileDetailPage = () => {
  const params = useParams();
  const id = params?.id;

  return (
    <>
      <div>Profile Detail Page</div>

      <div>User ID: {id}</div>
    </>
  );
};

export default ProfileDetailPage;
