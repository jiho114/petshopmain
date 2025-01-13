import React from 'react';
import MainSlider from '../componenets/MainSlider';
import BestItem from '../componenets/BestItem';
import FreshBox from '../componenets/FreshBox';
import Location from '../componenets/Location';
import Products from '../componenets/Products';



const Home = () => {
  return (
    <div>
      <MainSlider />
      <BestItem />
      <FreshBox />
      <Location/>
      <Products />
    </div>
  );
};

export default Home;