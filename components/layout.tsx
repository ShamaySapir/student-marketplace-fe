import Header from "../components/header";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import React from "react";
import { Box } from "@mui/material";

export interface IRenderOptions {
  renderHeader: boolean;
  renderSides: boolean;
  renderFooter: boolean;
}

interface IProps {
  children?: JSX.Element | JSX.Element[];
  renderOptions?: IRenderOptions;
}

export default function Layout({ children, renderOptions = {} }: IProps) {
  const {
    renderHeader = true,
    renderFooter = true,
    renderSides = true,
  } = renderOptions;
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
      {renderHeader && <Header />}
      {(renderSides && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gridTemplateAreas: `". content content content content content ."`,
            alignItems: "center",
          }}
        >
          <Box sx={{ gridArea: "content" }}>
            <main>{children}</main>
          </Box>
        </Box>
      )) || (
        <Box sx={{ gridArea: "content" }}>
          <main>{children}</main>
        </Box>
      )}
      {renderFooter && <Footer />}
    </>
  );
}
