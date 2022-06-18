import Header from "../components/header";
import Footer from "../components/footer";
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
    <div style={{ height: "100vh" }}>
      {renderHeader && <Header />}
      {(renderSides && (
        <Box
          sx={{
            minHeight: "74vh",
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gridTemplateAreas: `". content content content content content ."`,
            alignItems: "center",
          }}
        >
          <Box sx={{ gridArea: "content" }}>
            <main style={{ minHeight: "74vh" }}>{children}</main>
          </Box>
        </Box>
      )) || (
        <Box sx={{ gridArea: "content", margin: 0, minHeight: "74vh" }}>
          <main style={{ minHeight: "74vh" }}>{children}</main>
        </Box>
      )}
      {renderFooter && <Footer />}
    </div>
  );
}
