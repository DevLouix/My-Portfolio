import { Box } from "@mui/material";
import React from "react";

function Links() {
  return (
    <Box
      sx={{
        color: "whitesmoke",
        display: "flex",
        flexDirection: "row",
        gap: "6px",
        fontWeight: "bold",
        "& div:hover": {
          borderBottom: "1px solid grey",
        },
      }}
    >
      <div>
        <a href="https://blog.devlouix.com">Blog</a>
      </div>
      <div>
        <a href="https://store.devlouix.com">App Store</a>
      </div>
      <div>
        <a href=""></a>
      </div>
    </Box>
  );
}

export default Links;
