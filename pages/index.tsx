import React, { useEffect, useState } from "react";
import ServiceTile from "../components/serviceTile";
import * as routes from "../tools/api/routes";
import { DescriptionItem } from "../types/types";
import { Grid } from "@mui/material";
import SwimLane from "../components/swimLane";
import { map } from "lodash";

export default function Page() {
  const [displayItems, setDisplayTileItems] = useState({});
  useEffect(() => {
    async function fetchDisplayTileData() {
      const itemsToShow = await routes.getDisplayTileData();
      setDisplayTileItems(itemsToShow);
    }
    fetchDisplayTileData();
  }, []);

  const prepareSlides = (services: DescriptionItem[]) =>
    services?.map((content: DescriptionItem, index) => (
      <ServiceTile {...content} key={index} />
    ));

  // const deleteUserFunc = async () => {
  //   const response = await routes.deleteUser({
  //     userId: session!.user.googleId as string,
  //   });
  // };

  return (
    <>
      {/* <Button onClick={deleteUserFunc}>delete user</Button> */}
      <Grid container>
        {map(displayItems, (tileData, category) => (
          <Grid container item>
            <SwimLane serviceTiles={prepareSlides(tileData)} name={category} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
