import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import AccessDenied from "../components/accessDenied";
import ServiceTile from "../components/serviceTile";
import { DescriptionItem } from "../types/types";
import * as routes from "../tools/api/routes";
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

  return (
    <>
      {map(displayItems, (tileData, category) => (
        <>
          {category}
          <SwimLane serviceTiles={prepareSlides(tileData)} />
        </>
      ))}
    </>
  );
}
