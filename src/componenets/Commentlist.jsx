import React, { useState, useEffect } from 'react';
import './Commentlist.scss'
import { API_URL } from '../config/constants';
import { useParams } from 'react-router-dom';

const Commentlist = () => {
  const { post_id } = useParams();
  const [content, setContent] = useState("");
  const [postid, setPostid] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {}, [])
  const onCancel = () => {
    setContent("");
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    if(content.trim() === ""){
      alert("댓글 내용을 입력해 주세요.");
      return ;
    }
    if(!postid){
      alert("게시글 ID를 입력해 주세요.")
    }
    fetch(`${API_URL}/comments`, {
      method : "POST", //fetch문 사용 시 method, heder, body 작성
      headers : {"Content-Type" : "application/json", } ,
      body : JSON.stringify({
        content,
        post_id: postid,
      })
    })
      .then(
        (response)=>{
          if(!response.ok){
            console.error("응답상태", response.status);
            throw new Error ("댓글 작성 실패");
          }
          return response.json()
        }
      )
      .then(
        (data)=>{
          console.log("댓글 작성 성공:", data)
          setContent("");
        }
      )
      .catch(
        (error)=>{
          console.error("댓글 작성 중 에러 발생",error)
          alert("댓글 작성에 실패하였습니다.")
        }
      )    
  }

  const handleDelete = () => {
    
  }
  // console.log("API URL:", `${API_URL}/comments`);
  return (
    <div className='commentlist'>
      <h3>댓글</h3>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setPostid(e.target.value)} value={post_id} className='commentInput' type="text" placeholder='게시글 ID를 입력해 주세요.' />
        <textarea value={content} onChange={(e)=>setContent(e.target.value)} className='commentText' placeholder='댓글을 작성해 주세요.'></textarea>
        <button className='commentBtn1' type='submit'>댓글 작성</button>
        <button className='commentBtn2'>취소</button>
      </form>
      <hr />
      <div className="comment-list">
        {
          comments.length === 0 ? (
            <p>댓글을 작성해 주세요.</p>
          ) : (
            comments.map((comment) => (
              <div className="itemlist" key={comment.id}>
                <p>{comment.contens}</p>
                <button>수정</button>
                <button onClick={handleDelete}>삭제</button>
              </div>
            ))
          )
        }
      </div>
    </div>
  );
};

export default Commentlist;