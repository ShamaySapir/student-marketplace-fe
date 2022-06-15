import React from "react";
import { Divider, Grid, Button, Typography } from "@mui/material";
import Slider from "react-slick";
import {
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
} from "@mui/icons-material";

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      style={{
        position: "absolute",
        display: "block",
        padding: 0,
        top: "50%",
        left: "100%",
      }}
    >
      <Button onClick={onClick}>
        <NavigateNextIcon />
      </Button>
    </div>
  );
};
const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      style={{
        position: "absolute",
        display: "block",
        padding: 0,
        top: "50%",
        right: "98%",
      }}
    >
      <Button onClick={onClick}>
        <NavigateBeforeIcon />
      </Button>
    </div>
  );
};

const SwimLane = ({
  name,
  serviceTiles,
}: {
  name: string;
  serviceTiles: JSX.Element[];
}) => {
  const MIN_TILES = 4;

  return (
    <Grid container direction="column" sx={{ marginBottom: "3vh" }}>
      <Grid item textAlign="center">
        <Divider />
        <Typography
          fontFamily={"Lato"}
          variant="h4"
          sx={{ mt: 4, mb: 4, color: "#4E5166", margin: 0 }}
        >
          <strong>{name}</strong>
        </Typography>
        <Divider sx={{ marginBottom: "2vh" }} />
      </Grid>
      <Grid item style={{ width: "90%" }}>
        <Slider
          dots
          infinite={false}
          speed={500}
          slidesToShow={MIN_TILES}
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
        >
          {[
            ...serviceTiles,
            ...Array.from(
              Array(Math.max(MIN_TILES - serviceTiles.length, 0)).keys()
              // eslint-disable-next-line react/jsx-key
            ).map((x) => <div></div>),
          ]}
        </Slider>
      </Grid>
    </Grid>
  );
};

export default SwimLane;
