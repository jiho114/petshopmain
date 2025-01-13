import React from "react";
import { Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import {Link} from 'react-router-dom';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import freshData from '../data/datafresh';
import "./FreshBox.scss";

const Card = () => {
  return (

    <Swiper
      className="freshboxswiper"
      modules={[Autoplay]}
      speed={1500}
      autoplay={{
        delay: 3000, // 슬라이드 대기 시간 (ms)
        disableOnInteraction: false, // 사용자가 스와이프해도 autoplay 유지
      }}
      loop={true} // 루프 활성화
      spaceBetween={10} // 슬라이드 간 간격
      slidesPerView={2} // 한번에 보이는 슬라이드 개수
      breakpoints={{
             
        768:{
        slidesPerView:3,            
        },
        1024:{
        slidesPerView:4,
        }
      
      }}
      onSwiper={(swiper) => console.log(swiper)} // 디버깅용
      onSlideChange={() => console.log("slide change")} // 디버깅용
    >
      {freshData.map((item, idx) => (
        <SwiperSlide  className="freshWrap">
        <Link to ={`/about/${item.id}`}>
            <img src={item.img} alt="" />
            <div className="txt" key={idx}>
              <span className="freshNumber">{item.id+1}</span>
              <strong>{item.title}</strong>
              <span className="price">{item.price}</span>
            </div>
        </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Card;
