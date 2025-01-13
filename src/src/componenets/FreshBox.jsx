import React from 'react';

import './FreshBox.scss';
import Card from './Card'


const FreshBox = () => {
  return (
    <div className='freshbox'>
      <h2>Hello Fresh Box</h2>
      <p>We save you serious time</p>
      <div className="freshboxWrap">
         <Card/>
      </div>
    </div>
  );
};

export default FreshBox;