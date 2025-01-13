import React,{useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import './productpage.scss';
import { GiHollowCat } from "react-icons/gi";
import axios from 'axios';
import { API_URL } from '../config/constants'; 
import CommentsList from './CommentList';


const ProductPage = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [product,setProduct] = useState([]);

  useEffect(()=>{
    axios.get(`${API_URL}/products/${id}`)
    .then((res)=>{
      //setProduct(res.data.product);
      setProduct(res.data.product);
     // console.log(res.data.product);
      console.log(res.data.product);
    })
    .catch((err)=> console.log(err))
  },[id])

  return (
    <div className='productpage'>
      <button onClick={() => navigate(-1)} className='back-btn'>이전화면</button>
      <h1>상품 상세 페이지</h1>
      <div className="image-box">
      <img src={`${API_URL}/${product.imageUrl}`} alt={product.name} />
      </div>
      <div className="profile-box">
       <GiHollowCat className='icon' />
       <div className="product-seller">{product.seller}</div>
      </div>
      <div className="contents-box">
        <div className="name">{product.name}</div>
        <div className="desc">{product.description}</div>
        <div className="price">{product.price}</div>
        <div className="createAt">2025.01.03</div>
      </div>

      <hr />
      <CommentsList />
    </div>
  );
};

export default ProductPage;