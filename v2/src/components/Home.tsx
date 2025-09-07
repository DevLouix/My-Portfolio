"use client";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import ProfileImage from "./ProfileImage";
import Links from "./Links";
import { HireMe } from "./HireMe";
import Connect from "./Connect";
import Description from "./Description";

function HomePageComponent() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box mt={2} />

      <ProfileImage />
      <Typography variant="h4" fontWeight={"bold"}>
        Dev Louix
      </Typography>

      <Description />
      {/* <Links /> */}
      <HireMe />

      <Box mt={5} />
      <Connect themeMode={"light"} anim={false} />
    </Box>
  );
}

export default HomePageComponent;
