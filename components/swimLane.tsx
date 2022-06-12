import React from "react";
import { Divider, Grid, Typography } from "@mui/material";
import Slider from "react-slick";
const SwimLane = ({
  name,
  serviceTiles,
}: {
  name: string;
  serviceTiles: JSX.Element[];
}) => {
  const MIN_TILES = 4;

  return (
    <Grid item container>
      <Grid item alignItems={"center"} flex={"auto"}>
        <Divider />
        <Typography
          fontFamily={"Lato"}
          textAlign={"center"}
          variant="h4"
          sx={{ mt: 7, mb: 7, color: "#4E5166" }}
        >
          <strong>{name}</strong>
        </Typography>
        <Divider />
      </Grid>

      <div style={{ width: "100%" }}>
        <Slider dots infinite speed={500} slidesToShow={MIN_TILES}>
          {[
            ...serviceTiles,
            ...Array.from(
              Array(Math.max(MIN_TILES - serviceTiles.length, 0)).keys()
              // eslint-disable-next-line react/jsx-key
            ).map((x) => <div></div>),
          ]}
        </Slider>
      </div>
    </Grid>
  );
};

export default SwimLane;
