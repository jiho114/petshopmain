import React, {useState, useEffect} from 'react';
import {NavLink, Link, useNavigate} from 'react-router-dom';
import { RiMenu3Fill } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import $ from 'jquery';
import {isActiveToken} from '../componenets/AccessTokenContext';

const Nav = () => {
  const navigate=useNavigate();
  const [menuOpen, setMenuOpen]=useState(true);
  const [isScrolled, setIsScrolled]=useState(false);
  const [accessResult, setAccessResult]=useState(null);
  const [user_id, setUserId]= useState(null);
  function logout(){
    localStorage.removeItem('accessToken');
    setAccessResult(false);
    navigate("/")
  }
  const accessToken=localStorage.getItem('accessToken');

  useEffect(()=>{
    const handleScroll = () =>{
      if(window.scrollY> 50){
        setIsScrolled(true) // 흰배경 적용
      } else{
        setIsScrolled(false) // 흰배경 제거
      } 
    }
    window.addEventListener("scroll", handleScroll);
    return () =>{ 
      window.addEventListener("scroll", handleScroll);
    }
  }, []);
  useEffect(()=>{
    //accessToken사용할 코드
    const verifyToken= async () =>{
      const result = await isActiveToken(accessToken);
      setAccessResult(result.accessResult)
      setUserId(result.user_id)
    }
    verifyToken();
  },[accessToken, accessResult])

  

  const activeStyle={
    color:'cadetblue'
  }
  const toggleMenu = () =>{
    setMenuOpen(prevMenuOpen => !prevMenuOpen);
    $('.mobile-header-drop').slideToggle(500);
  }
  if(accessResult === true){
    return (
      <div className={`header ${isScrolled ? "scrolled": ""}`}>
          <div className="header-inner">
            <div className="logo">
              <Link to="/"><img src={process.env.PUBLIC_URL + "/img/logo.png"} alt="" /></Link>
            </div>
            <div className="nav signArea-user">
              <ul className='loginAndsignup signList'>
                <li className='user-info'>{user_id}님 반갑습니다</li>
                <li className='logout-box'><div className="logout" onClick={() => logout()}>로그아웃</div></li>
              </ul>
              <ul className="menu">
                <li><Link to="">Home</Link></li>
                <li><Link to="">About</Link></li>
              </ul>
            </div>
            <div className="movieNav">
              <span>
                {
                  menuOpen ? (<RiMenu3Fill onClick={toggleMenu} />) : (<MdOutlineClose onClick={toggleMenu} />)
                }
                

              </span>
              <div className={`mobile-header-drop ${menuOpen ? '':'open'}`}>
                <div>
                  <div className="mobile-header-nav">
                    <div className="mobile-header-menu">
                      <ul>
                        <li>
                          <NavLink to="/" style={({isActive})=>(isActive? activeStyle:undefined)}>Home</NavLink>
                        </li>
                        <li>
                          <NavLink to="/about" style={({isActive})=>(isActive? activeStyle:undefined)}>About</NavLink>
                        </li>
                      </ul>
                    </div>
                    <div className="mobile-header-loginJoin">
                      <ul className='signList'>
                        <li className='user-info'>{user_id}님 반갑습니다</li>
                        <li className='logout-box'><div className="logout" onClick={() => logout()}>로그아웃</div></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }else{
    return (
      <div className={`header ${isScrolled ? "scrolled": ""}`}>
          <div className="header-inner">
            <div className="logo">
              <Link to="/"><img src={process.env.PUBLIC_URL + "/img/logo.png"} alt="" /></Link>
            </div>
            <div className="nav">
              <ul className='loginAndsignup'>
                <li className='sign-in'><Link to="/login">로그인</Link></li>
                <li className='sign-up'><Link to="/signup">회원가입</Link></li>
              </ul>
              <ul className="menu">
                <li><Link to="">Home</Link></li>
                <li><Link to="">About</Link></li>
              </ul>
            </div>
            <div className="movieNav">
              <span>
                {
                  menuOpen ? (<RiMenu3Fill onClick={toggleMenu} />) : (<MdOutlineClose onClick={toggleMenu} />)
                }
                

              </span>
              <div className={`mobile-header-drop ${menuOpen ? '':'open'}`}>
                <div>
                  <div className="mobile-header-nav">
                    <div className="mobile-header-menu">
                      <ul>
                        <li>
                          <NavLink to="/" style={({isActive})=>(isActive? activeStyle:undefined)}>Home</NavLink>
                        </li>
                        <li>
                          <NavLink to="/about" style={({isActive})=>(isActive? activeStyle:undefined)}>About</NavLink>
                        </li>
                      </ul>
                    </div>
                    <div className="mobile-header-loginJoin">
                      <ul>
                        <li>
                          <Link to="/login">로그인</Link>
                        </li>
                        <li>
                          <Link to="/singup">회원가입</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
};

export default Nav;