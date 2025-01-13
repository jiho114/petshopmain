import React, {useState, useRef} from 'react';
import { Navigation, Pagination, Autoplay} from 'swiper/modules';
import { GrFormNextLink } from "react-icons/gr";
import { GrFormPreviousLink } from "react-icons/gr";
import { RiPauseMiniFill } from "react-icons/ri";
import { CiPlay1 } from "react-icons/ci";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import data from '../data/data'



const MainSlider = () => {
	const [swiperIndex, setSwiperIndex] = useState(0);//페이지네이션
	const [swiper, setSwiper] = useState(null);//슬라이드용
	/* const [textSwiperIndex, setTextSwiperIndex] = useState(0);//텍스트 슬라이드용 */
	const [textSwiper, setTextSwiper] = useState(null);//텍스트 슬라이드용 swiper
	const [bgColor, setBgColor] = useState(); //배경색 
	const  swiperRef= useRef(null);
	const [isAutoplayPaused, setIsAutoplayPaused] =useState(false); //제어버튼
	const [isActive, setIsActive]= useState(false) //active button

	const prev= () =>{
		swiper?.slidePrev();
		textSwiper?.slidePrev();
	}
	const next= () =>{
		swiper?.slideNext();
		textSwiper?.slideNext();
	}
	const autoPlayToggle= ()=>{
		if(swiper && swiper.autoplay && textSwiper && textSwiper.autoplay){
			if(swiper.autoplay.running && textSwiper.autoplay.running){
				textSwiper.autoplay.stop();
				swiper.autoplay.stop();
				setIsAutoplayPaused(true);
			}else{
				textSwiper.autoplay.start();
				swiper.autoplay.start();
				setIsAutoplayPaused(false);
			}
		}

		setIsActive(!isActive);

	}

	return (
		<div className={`mySwiper mainslider`} style={{background:bgColor}}>
			<div className="cont">
			<Swiper
			// install Swiper modules
			modules={[Navigation, Pagination, Autoplay]}
			spaceBetween={0}
			slidesPerView={1}
			speed={1500}
			autoplay={
				{
					delay: 3000,
					disableOnInteraction: false,
				}
			}
			loop
			onSwiper={(swiper) => {setTextSwiper(swiper); swiperRef.current=swiper}}
			onActiveIndexChange={(e) => setSwiperIndex(e.realIndex)}
			className='textSlide'
			>
				{
					data.map((item) => (
						<SwiperSlide key={item.id}>
							<div className="tit_wrap">
								<em>{item.textT}</em>
								<strong>{item.textblod}</strong>
								<a href={item.textLink}>자세히 보기</a>
							</div>
						</SwiperSlide>
					))
				}
			</Swiper> 
			</div>
			<div className="img_wrap">
				<Swiper
				// install Swiper modules
				modules={[Navigation, Pagination, Autoplay]}
				spaceBetween={30}
				speed={1500}
				slidesPerView={'auto'}
				autoplay={
					{
						delay:3000,
						disableOnInteraction: false,
					}
				}
				loop={true}
				onSwiper={(swiper) => {setSwiper(swiper); swiperRef.current=swiper}}
				onActiveIndexChange={(e) => setSwiperIndex(e.realIndex)}
				onSlideChange={(e) => {
					const realIndex=e.realIndex;
					const bgColors=['rgb(159, 245, 243)', 'rgb(235, 143, 171)', 'rgb(247, 178, 246)']
					setBgColor(bgColors[realIndex])
					const progressBar=document.querySelector('.fill')
					const progressWidth= ((realIndex+1)/data.length)*100;

					if(realIndex===0 && e.activeIndex !==0){
						progressBar.style.transition='none';
						progressBar.style.width='0%';

						setTimeout(() => {
							progressBar.style.transition='width .3s ease'
						},50);
						if(e.activeIndex !==0){
							progressBar.style.transition='width .3s ease';
							progressBar.style.width=`${progressWidth}%`;
						}

					}else{
						progressBar.style.width=`${progressWidth}%`;
					}

					

					setSwiperIndex(realIndex)

				}}
				/* onReachEnd={() =>{
					document.querySelector('.fill').style.width='0%';
					setSwiperIndex(0)
				}} */
				
				className='mainSwiper'
				>
					{
						data.map((item) =>(
							<SwiperSlide key={item.id}><img src={process.env.PUBLIC_URL + item.img} alt={item.textT} /></SwiperSlide>
						))
					}
					
					
				</Swiper>
			</div>
			<div className="page_box">
				<div className="page">
					<div className="swiper_progress_bar">
						<div className='slider-bar'>
							<div className="fill"></div>
						</div >
					</div>
					<div className="swiper-pagination">
						<span>0{swiperIndex+1}</span>
						<span> / </span>
						<span>0{data.length}</span>
					</div>
					<div className="swiper_btn">
						<div className="swiperPrevBtn" onClick={prev}><GrFormPreviousLink /></div>
						<div className="btn-auto">
							<div className="btn-stop" onClick={ autoPlayToggle}>
								{
									isActive ?   <CiPlay1 />:<RiPauseMiniFill />
								}
								
							</div>
						</div>
						<div className="swiperNextBtn" onClick={next}><GrFormNextLink /></div>
						
						
					</div>
				</div>
			</div>
			
		</div>
	);
};

export default MainSlider;