import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { isObject } from "lodash";
import "swiper/css";
// import "swiper/css/pagination";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const SwimLane = ({
  name,
  serviceTiles,
}: {
  name: string;
  serviceTiles: JSX.Element[];
}) => {
  const MIN_LIZARDS = 4;

  const serviceTilesWithSpaces = [
    ...serviceTiles,
    ...Array.from(Array(Math.max(MIN_LIZARDS - serviceTiles.length, 0)).keys()),
  ];
  const [swiperRef, setSwiperRef] = useState(null);
  // const NUMBER_OF_ LIZARDS = Math.min(serviceTiles.length, MIN_LIZARDS);
  return (
    <Grid item container>
      <Grid item>
        <Typography>{name}</Typography>
      </Grid>
      <Grid container item>
        <Swiper
          onSwiper={setSwiperRef as any}
          spaceBetween={10}
          slidesPerView={MIN_LIZARDS}
          navigation
          virtual
          modules={[Pagination]}

          // pagination={{ clickable: true }}
        >
          {serviceTilesWithSpaces.map((slideContent: any, index: number) => (
            <SwiperSlide key={index} virtualIndex={index}>
              {isObject(slideContent) ? slideContent : null}
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>
    </Grid>
  );
};

export default SwimLane;
