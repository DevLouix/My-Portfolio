"use client";

import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";

interface ConnectImagesProps {
  themeMode: "light" | "dark";
  anim: boolean;
}

const icons = [
//   {
//     light: "https://cdn-icons-png.flaticon.com/128/174/174855.png",
//     dark: "https://cdn-icons-png.flaticon.com/128/2111/2111463.png",
//     alt: "Follow Me Icon",
//   },
  {
    light: "/twitter1.png",
    dark: "/twitter2.png",
    alt: "Twitter Icon",
  },
  {
    light: "/linkedin1.png",
    dark: "/linkedin2.png",
    alt: "LinkedIn Icon",
  },
  {
    light: "/youtube1.png",
    dark: "/youtube1.png",
    alt: "YouTube Icon",
  },
  {
    light: "/fb1.png",
    dark: "/fb2.png",
    alt: "Facebook Icon",
  },
];

export default function Connect({ themeMode, anim }: ConnectImagesProps) {
  // Base animation classes
  const baseClass = anim
    ? "animate__animated animate__hinge"
    : "animate__animated delay1_5 animate__fadeInDown";

  return (
    <Box
      display="flex"
      gap={1.25} // 10px gap (1.25 * 8px = 10px)
      alignItems="center"
    >
      {icons.map(({ light, dark, alt }, index) => (
        <Image
          key={index}
          className={baseClass}
          src={themeMode === "light" ? light : dark}
          height={24}
          width={24}
          alt={alt}
          priority={true}
        />
      ))}
    </Box>
  );
}
