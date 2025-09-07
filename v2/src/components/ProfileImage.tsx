import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

function ProfileImage() {
  return (
    <img
      src="/pp.jpg"
      alt="Profile"
      style={{
        height: "80px",
        width: "80px",
        borderRadius: "50%", // makes it rounded
        objectFit: "cover", // makes image cover the container without distortion
        display: "block", // removes inline img gap
        margin: "0 auto", // centers horizontally if container allows
      }}
    />
  );
}

export default ProfileImage;
