import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import AccessDenied from "../components/accessDenied";
import ServiceTile from "../components/serviceTile";
import Link from "next/link";
import { Button } from "@mui/material";
import * as routes from "../tools/api/routes";
import { DescriptionItem } from "../types/types";
import SwimLane from "../components/swimLane";
import { map } from "lodash";

export default function Page() {
  const [session, loading] = useSession();
  const [content, setContent] = useState();
  const [displayItems, setDisplayTileItems] = useState({});
  // Fetch content from protected route
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

  useEffect(() => {
    async function fetchDisplayTileData() {
      const itemsToShow = await routes.getDisplayTileData();
      setDisplayTileItems(itemsToShow);
    }
    fetchDisplayTileData();
  }, []);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return <AccessDenied />;
  }
  const prepareSlides = (services: DescriptionItem[]) =>
    services?.map((content: DescriptionItem, index) => (
      <ServiceTile {...content} key={index} />
    ));

  const deleteUserFunc = async () => {
    const response = await routes.deleteUser({
      userId: session!.user.googleId as string,
    });
  };

  return (
    <>
      <Button onClick={deleteUserFunc}>delete user</Button>
      {map(displayItems, (tileData, category) => (
        <>
          {category}
          <SwimLane serviceTiles={prepareSlides(tileData)} />
        </>
      ))}
    </>
  );
}
