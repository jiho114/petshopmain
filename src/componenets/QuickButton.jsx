import React,{useState, useEffect} from 'react';
import { IoIosArrowUp } from "react-icons/io";

const QuickButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() =>{
    const handleScroll = () =>{
      setIsVisible(window.scrollY> 300)
    }
    window.addEventListener('scroll',handleScroll );
    return () =>{
      window.addEventListener('scroll',handleScroll );
    }
  }, [])

  const scrollTop = () =>{
    window.scrollTo({top: 0, behavior:"smooth"})
  }
  return isVisible && (
    <div className='QuickButton' style={{position:'fixed', bottom: '10%', right: '20px', zIndex:99999999, backgroundColor:'#fff', boxShadow:"2px 2px 5px #000", borderRadius:'50%', width: '50px', height: '50px', display:'flex', justifyContent:'center', alignItems:'center'}}>
      <IoIosArrowUp style={{fontSize:'35px', color:'#bbb'}}  onClick={scrollTop}/>
    </div>
  );
};

export default QuickButton;