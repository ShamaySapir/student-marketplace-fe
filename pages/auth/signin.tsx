import React from "react";
import GoogleLoginIcon from "./gLoginIcon.svg";
import Box from "@mui/material/Box";

const SignInPage: React.FC = () => {
  return (
    // <div style={{ height: "100vh", width: "100vw", margin: 0, padding: 0 }}>
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 1,
        gridTemplateRows: "auto",
        gridTemplateAreas: `". . ."
      ". loginIcon ."
      ". . ."`,
      }}
    >
      <Box sx={{ gridArea: "loginIcon" }}>
        {" "}
        <GoogleLoginIcon />
      </Box>
    </Box>
    // </div>
  );
};

export default SignInPage;
