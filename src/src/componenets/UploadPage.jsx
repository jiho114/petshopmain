import React, {useState} from 'react';
import { Button,  Form, Input, Upload , Divider, InputNumber, message } from 'antd';

import './uploadPage.scss'
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import { API_URL } from '../config/constants';
import {useNavigate} from 'react-router-dom'

const UploadPage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const navigate=useNavigate();

  const onFinish = (val) => {
     axios.post(`${API_URL}/products`, {
        name:val.name,
        description: val.description,
        price:val.price,
        seller:val.seller,
        imageUrl:imageUrl,
     })
     .then((result)=>{
        navigate("/", {replace:true})
     })
     .catch((error)=>{
        console.log(error);
        message.error(`에러가 발생했습니다.`)
     })
  };

  const onChangeImage = (info) =>{
     if(info.file.status === "uploading"){
        return;
     }
     if(info.file.status === "done"){
        const response=info.file.response;
        const imageUrl=response.imageUrl;
        setImageUrl(imageUrl)
     }
  }

  return (
    <div className='uploadpage'>
      <Form name="basic" onFinish={onFinish}  >
        <Form.Item name="files" valuePropName='image'>
          <Upload name='image'  action={`${API_URL}/image`} listType='picture' showUploadList={false} onChange={onChangeImage}>
              {
                imageUrl ? (
                  <div className="upload-img1">
                    <img src={`${API_URL}/${imageUrl}`} alt="uploadImg" id="upload-img" />
                  </div>
                ) : (
                  <div className="upload-img">
                    <img src={process.env.PUBLIC_URL + '/img/icon/camera.png'} alt="" />
                    <span>이미지를 업로드해주세요</span>
                </div>
                )
              }
             

          </Upload>
        </Form.Item>
        <Divider />
        <Form.Item
          label={<span className='upload-label'>판매자명</span>}
          name="seller" 
          rules={[
            {
              required: true,
              message:'판매자명은 필수 입력사항입니다'
            }
          ]}
          >
          <Input placeholder='이름을 입력해 주세요' size="large" />
        </Form.Item>
          <Divider />
          <Form.Item
          label={<span className='upload-label'>상품명</span>}
          name="name" 
          rules={[
            {
              required: true,
              message:'상품명은 필수 입력사항입니다'
            }
          ]}
          >
          <Input placeholder='이름을 입력해 주세요' size="large" />
        </Form.Item>
          <Divider />
          <Form.Item
          label={<span className='upload-price'>판매가</span>}
          name="price" 
          rules={[
            {
              required: true,
              message:'판매가는 필수 입력사항입니다'
            }
          ]}
          initialValue={0}
          >
          <InputNumber className='upload-price' min={0} size="large" />
        </Form.Item>
          <Divider />
          <Form.Item
          label={<span className='upload-label'>상품설명</span>}
          name="description" 
          rules={[
            {
              required: true,
              message:'상품설명은 필수 입력사항입니다'
            }
          ]}
          initialValue={0}
          >
          <TextArea className='productDescription' min={0} size="large" placeholder='상품설명을 작성해주세요' />
        </Form.Item>
          <Divider />
        <Form.Item label={null}>
          <Button  htmlType="submit" id="submit-button">
            상품등록하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UploadPage;