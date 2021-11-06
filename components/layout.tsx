import Header from "../components/header";
import Footer from "../components/footer";
import React from "react";
interface IProps {
  children?: JSX.Element | JSX.Element[];
}

export default function Layout({ children }: IProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
