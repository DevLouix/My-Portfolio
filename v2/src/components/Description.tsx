"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { Fira_Mono, Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300"],
});
const firaMono = Fira_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

const Description: React.FC = () => {
  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 2,
        px: 2,
        textAlign: "center",
      }}
    >
      <Typography
        variant="body1"
        color="white"
        sx={{
          fontSize: 15,
          lineHeight: 1.6,
          fontFamily: firaMono.style.fontFamily,
        }}
      >
        A <strong>Creative Technologist</strong> specializing in full-stack
        software development, 3D modeling, animation, and game development. With
        a passion for blending technology and creativity, I build engaging web
        apps, immersive games, and stunning 3D visuals.
      </Typography>
      <Typography
        variant="body1"
        color="white"
        sx={{
          fontSize: 15,
          mt: 2,
          lineHeight: 1.6,
          fontFamily: firaMono.style.fontFamily,
        }}
      >
        Driven by balance and innovation, I strive to create seamless digital
        experiences that captivate users and solve real-world problems.
      </Typography>
    </Box>
  );
};

export default Description;
