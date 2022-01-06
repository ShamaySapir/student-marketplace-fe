import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const SwimLane = ({
  name,
  serviceTiles,
}: {
  name: string;
  serviceTiles: JSX.Element[];
}) => {
  const [swiperRef, setSwiperRef] = useState(null);
  const NUMBER_OF_LIZARDS = Math.min(serviceTiles.length, 5);
  return (
    <Grid container>
      <Grid item>
        <Typography>{name}</Typography>
      </Grid>
      <Grid container item>
        <Swiper
          onSwiper={setSwiperRef as any}
          spaceBetween={10}
          slidesPerView={NUMBER_OF_LIZARDS}
          navigation
          virtual
          // pagination={{ clickable: true }}
        >
          {serviceTiles.map((slideContent: any, index: number) => (
            <SwiperSlide key={index} virtualIndex={index}>
              {slideContent}
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>
    </Grid>
  );
};

export default SwimLane;
