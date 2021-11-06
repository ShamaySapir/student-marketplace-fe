import Header from "../components/header";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import React from "react";
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
  const ChildrenWithProps = React.cloneElement(children, {
    isAuthenticated: session,
  });
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
