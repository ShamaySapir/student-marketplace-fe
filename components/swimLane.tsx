import React, { useState } from "react";

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const SwimLane = ({ serviceTiles }: { serviceTiles: any }) => {
  const [swiperRef, setSwiperRef] = useState(null);
  const NUMBER_OF_LIZARDS = 5;
  return (
    <>
      <Swiper
        onSwiper={setSwiperRef as any}
        spaceBetween={10}
        slidesPerView={NUMBER_OF_LIZARDS}
        navigation
        virtual
        pagination={{ type: "fraction", clickable: true }}
        // onSlideChange={() => console.log("slide change")}
      >
        {serviceTiles.map((slideContent: any, index: number) => (
          <SwiperSlide key={index} virtualIndex={index}>
            {slideContent}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwimLane;
