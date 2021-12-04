import Header from "../components/header";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import React from "react";
import { Box, Grid } from "@mui/material";

interface IProps {
  children?: JSX.Element | JSX.Element[];
}

export default function Layout({ children }: IProps) {
  const [session, loading] = useSession();
  const [content, setContent] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/examples/protected");
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
  }, [session]);
  return (
    <>
      <Header />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gridTemplateAreas: `". content content content content content."`,
          alignItems: "center",
        }}
      >
        <Box sx={{ gridArea: "content" }}>
          <main>{children}</main>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
