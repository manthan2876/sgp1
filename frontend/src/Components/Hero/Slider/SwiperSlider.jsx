import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Navigation } from "swiper/modules";

import JoinCommunity from "./JoinCommunity";
import GetRewards from "./GetRewards";
import GetLatestNews from "./GetLatestNews";

const SwiperSlider = () => {
  return (
    <div className="relative">
      <Swiper
        spaceBetween={30}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        className="w-full h-1/3"
        modules={[Autoplay, Navigation]}
      >
        

        <SwiperSlide>
          <JoinCommunity />
        </SwiperSlide>

        <SwiperSlide>
          <GetRewards />
        </SwiperSlide>

        <SwiperSlide>
          <GetLatestNews />
        </SwiperSlide>
      </Swiper>

      <style jsx="true" global="true"> {`
        .swiper-button-next,
        .swiper-button-prev {
          color: #808000; 
          @apply text-accent-light dark:text-accent-dark;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          color: #a2a220; 
          @apply hover:text-primary-dark dark:hover:text-primary-light;
        }
      `}</style>
    </div>
  );
};

export default SwiperSlider;
