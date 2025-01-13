import React,{useState, useEffect} from 'react';
import { API_URL } from '../config/constants';
import {jwtDecode} from 'jwt-decode';

const CommentForm = ({setComments, setIsAdding}) => {
   /* const {post_id} = useParams(); */
   const [content, setContent] = useState('');
   const [postId, setPostId] = useState('');

   const [user_id, setUserId] = useState(null);
   const accessToken= localStorage.getItem('accessToken');

   useEffect(() =>{
    if(accessToken){
      try{
        const decodedToken = jwtDecode(accessToken);
        console.log('Decoded Token:' , decodedToken);
        setUserId(decodedToken.id)
      } catch (error) {
        console.error('유효하지 않은 토큰입니다', error)
      }
    }
   }, [accessToken])

  const hanleSubmit = (e)=>{
    e.preventDefault();
  
    if(!postId){
      alert("게시글 id를 입력해주세요!");
      return;
    }

    if(!user_id){
      alert("로그인 상태가 아닙니다");
      return;
    }

    console.log("요청URL===", `${API_URL}/comment`);
    console.log("요청내용===", { post_id: postId, content });

    fetch(`${API_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        post_id : postId,
        content,
      })
    })
    .then((response)=>{
      if(!response.ok){ // 응답 200 이상이면 정상, 400 이상이면 에러
        console.error("응답상태", response.status);
        throw new Error("댓글 작성 실패");
      }
      return response.json();
    })
    .then((data)=>{
      console.log("작성성공", data);
      if(content && postId){
        setComments((prevComments) => [...prevComments, data.comment]);
        setContent('');
        setPostId('');
      }
     
    })
    .catch((err)=>{ console.log(err); })
    if(content.trim() === ""){
      alert("댓글을 입력해주세요!");
      return;
    }
  }
  return (
    <form  onSubmit={hanleSubmit}>
        <input className='commentInput'  type="text" placeholder='게시글 Id를 입력해주세요' value={postId} onChange={(e) => setPostId(e.target.value)} />
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
        className='commentText' placeholder='댓글을 작성해주세요'></textarea>
        <button className='commentbtn1' type="submit">댓글 작성</button>
        <button className='commentInput2' type="button" onClick={() =>setIsAdding(false)} > 취소</button>
      </form>
  );
};

export default CommentForm;