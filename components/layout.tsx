import Header from "../components/header";
import Footer from "../components/footer";
import { useState } from "react";
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

export default function Layout({
  children,
  renderOptions = { renderHeader: true, renderFooter: true, renderSides: true },
}: IProps) {
  const {
    renderHeader = true,
    renderFooter = true,
    renderSides = true,
  } = renderOptions;

  return (
    <div>
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
          <Box sx={{ gridArea: "content", minHeight: "74vh" }}>
            <main>{children}</main>
          </Box>
        </Box>
      )) || (
        <Box sx={{ gridArea: "content", margin: 0 }}>
          <main>{children}</main>
        </Box>
      )}
      {renderFooter && <Footer />}
    </div>
  );
}
