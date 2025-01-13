import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import {DataContext} from '../App'
import Tabs from '../componenets/Tabs';
import TabData from '../data/tab.json';

const About = () => {
  const {id}=useParams();
  const {petData}=useContext(DataContext)
  const listData=TabData.filter((list) =>list.category === "dog" || list.category === "cat")
  const tabLabels = [
    {label:'dog', value:'dog'},
    {label:'cat', value:'cat'},
  ]
  return (
    <div className='about'>
      < div className='aboutWrap'>
        <div className="imgWrap">
          <img src={process.env.PUBLIC_URL + petData[id].img} alt="" />
        </div>
        <div className="cntWrap">
            <div className="title">{petData[id].title}</div>
            <div className="desc">{petData[id].desc}</div>
            <div className="price">{petData[id].price}</div>
        </div>
      </ div >
      <Tabs tabs={tabLabels} tabData={listData}/>

    </div>
  );
};

export default About;