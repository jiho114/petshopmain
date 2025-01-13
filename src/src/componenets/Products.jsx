import React,{useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom'
import { GiHollowCat } from "react-icons/gi";
import axios from 'axios';
import { API_URL } from '../config/constants'; 
import './products.scss'

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() =>{
    let url=`${API_URL}/products`;
    axios.get(url).then((result)=>{
      const products=result.data.products;
      console.log(products)
      setProducts(products)
    }).catch((error)=>{
      console.log(error)
    })
  }, [])
  return (
    <div className='products'>
      <h2>Products</h2>
      <p>상품업로드</p>
      <button className='button' onClick={() =>navigate('/uploadpage')}>상품 업로드</button>
      <div className="product-list">
        {
          products.map((product) => {
            return (
              <div className="product-card" key={product.id}>
              <Link to={`products/${product.id}`}>
                <div className="productImg">
                  <img src={`${API_URL}/${product.imageUrl}`} alt={product.name} />
                </div>
                <div className="productCnt">
                  <span className="product-name">{product.name}</span>
                  <span className="product-price">{product.price}</span>
                  <span className="product-seller">
                  <GiHollowCat className='icon' />
                  <strong>{product.seller}</strong>
                  </span>
                </div>
              </Link>
            </div>
            )
          })
        }
       

      </div>
    </div>
  );
};

export default Products;