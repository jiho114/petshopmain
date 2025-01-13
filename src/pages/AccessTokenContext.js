import React,{createContext, useContext, useState, useEffect} from 'react';
import { API_URL } from '../config/constants';
import axios from 'axios';

const AccessTokenContext = createContext();

export const useAccessToken= () =>{
  return useContext(AccessTokenContext)
}

export const isActiveToken = async (accessToken) => {
  try{
    const response = await axios.post(`${API_URL}/auth`, {accessToken});
    const result= response.data.result;
    if(result.id){
      return {accessResult: true, user_id: result.id}
    }else{
      return {accessResult: false}
    }
  }catch (error) {
    console.error("Token verification failed:", error);
    return {accessResult: false}
  }
}
export const AccessTokenProvider  = ({childern}) => {
const [accessToken, setAcessToken] = useState(localStorage.getItem(""));
const [user_id, setUserId] = useState(null);
const [loading, setLoding] = useState(true);

useEffect(()=>{
  const verifyToken = async () => {
    if(accessToken){
      const reslut = await isActiveToken(accessToken);
      setAcessResult(reslut.accessResult);
      setUserId(reslut.user_id)
    }else{

    }
  }
})
  return (
    <div>
      <AccessTokenContext.Provider value={{}}>
        {childern}
      </AccessTokenContext.Provider>
    </div>
  );
};

export default AccessTokenContext;