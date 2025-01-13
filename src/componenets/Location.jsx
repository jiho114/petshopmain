import React,{useState} from 'react';
import data from './../data/data1';
import {Link} from 'react-router-dom';
import { Navigation,Autoplay} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import './Location.scss';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


const Location = () => {
  const [dataLocation] = useState(data)
  return (
    <div className='location'>
        <h2>Location</h2>
        <p>신규 가맹점..</p>
        <div className="slideLocation">
          <Swiper
            className='locationSwiper'
            modules={[Navigation, Autoplay]}
            spaceBetween={5}
            slidesPerView={4}
            navigation
           loop={true}
           autoplay={{
            delay: 0,
            disableOnInteraction: false,
           }}
           speed={5000}
           loopAdditionalSlides={1}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            {
              dataLocation.map((data) => {
                return (
                  <SwiperSlide key={data.id}>
                    <div className="locationList">
                      <Link to="">
                          <div className="imgBox">
                            <img src={process.env.PUBLIC_URL+data.img} alt={data.title} />
                          </div>
                          <div className="textBox"><p>{data.title} </p></div>
                          <div className="addBox"><p>{data.add} </p></div>
                      </Link>
                    </div>
                  </SwiperSlide>
                )
              })
            }
           
           
          </Swiper>
        </div>
    </div>
  );
};

export default Location;