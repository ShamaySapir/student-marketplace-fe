// import React, { useState } from "react";
// import SwiperCore, { Virtual } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

// export default function SwimLane({ serviceTiles }: { serviceTiles: any }) {
//   SwiperCore.use([Virtual]);

//   const [swiperRef, setSwiperRef] = useState(null);

//   const prepend = () => {
//     swiperRef?.virtual?.prependSlide([
//       "Slide " + --prependNumber,
//       "Slide " + --prependNumber,
//     ]);
//   };

//   const append = () => {
//     swiperRef?.virtual?.appendSlide("Slide " + ++appendNumber);
//   };

//   const slideTo = (index) => {
//     swiperRef?.slideTo(index - 1, 0);
//   };

//   return (
//     <>
//       {serviceTiles.length > 0 ? (
//         <Swiper
//           onSwiper={setSwiperRef}
//           slidesPerView={2}
//           spaceBetween={30}
//           pagination={{
//             type: "fraction",
//             clickable: true,
//           }}
//           navigation
//           virtual
//         >
//           {serviceTiles.map((slideContent: any, index: number) => (
//             <SwiperSlide key={slideContent} virtualIndex={index}>
//               {slideContent}
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       ) : (
//         <h2>No products in this category</h2>
//       )}
//     </>
//   );
// }
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
        onSwiper={setSwiperRef}
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
