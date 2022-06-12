import React, { useState } from "react";
import { Divider, Grid, Typography } from "@mui/material";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { isObject } from "lodash";
import { styled } from "@mui/material/styles";
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

  const StyledTypography = styled(Typography)(({ theme })=>({
    fontFamily:'Lato',
    textAlign:"center",
    variant:"h4",
    sx:{
      mt:7,
      mb:7,
      color:"#4E5166"
    }
  }));

  const serviceTilesWithSpaces = [
    ...serviceTiles,
    ...Array.from(Array(Math.max(MIN_LIZARDS - serviceTiles.length, 0)).keys()),
  ];
  const [swiperRef, setSwiperRef] = useState(null);
  // const NUMBER_OF_ LIZARDS = Math.min(serviceTiles.length, MIN_LIZARDS);
  return (
    <Grid item container>
      <Grid item alignItems={"center"} flex={"auto"}>
      <Divider/>
        <StyledTypography  ><strong>{name}</strong></StyledTypography>
        <Divider/>
      </Grid>
      <Grid sx={{margin:2,justifyContent:"space-evenly"}} container item>
        <Swiper
          onSwiper={setSwiperRef as any}
          spaceBetween={25}
          slidesPerView={MIN_LIZARDS}
          navigation
          virtual
          modules={[Pagination]}
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
