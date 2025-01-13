import React,{useState, useEffect} from 'react';
import './CommentList.scss';
/* import {createComment, getComments} from '../api/api'; */
import CommentForm from './CommentForm';
import { API_URL } from '../config/constants';
import dayjs from 'dayjs';
import axios from 'axios';


const CommentList = ({post_id, user_id, comment}) => {
  const [comments, setComments]=useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding]=useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null)//수정 중인 댓글 ID
  const [editingContent, setEditingContent] = useState(''); //수정 중인 내용
  const [isProcessing, setIsProcessing]=useState(false)

 useEffect(() => {
    axios.get(`${API_URL}/comments`).then((result)=>{
      const comments=result.data.comments;
      setComments(comments)
     setLoading(false)
    }).catch((error)=>{
      console.log(error)
    })
   
  }, [isProcessing]);

  const handleEdit = (commentId, currentContent) =>{
    setEditingCommentId(commentId);
    setEditingContent(currentContent);
  }
  const handleCancelEdit = () =>{
    setEditingCommentId(null);
    setEditingContent('');
  }
  const handleUpdate = async (commentId) => {
    setIsProcessing(true)
    try{
      const accessToken=localStorage.getItem('accessToken');
      if(!accessToken){
        alert('로그인이 필요합니다.');
        return;
      }
      const response = await axios.put(
        `${API_URL}/comments/${commentId}`,
        { content: editingContent },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response)

      //목록 업데이트
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: response.data.content }
            : comment
        )
       
      );
      
      alert('댓글이 성공적으로 수정되었습니다.')
    }catch(error){
      console.error("댓글 수정 오류:", error.response?.data || error.message);
      alert("댓글 수정실패")
    } finally {
      setIsProcessing(false); //요청 완료
      setEditingContent('');
      setEditingCommentId(null);
    }
  }

  const handleDelete = async (commentId) =>{
    try{

      const accessToken=localStorage.getItem('accessToken');
      if(!accessToken){
        alert('로그인이 필요합니다.');
        return;
      }
      await axios.delete(`${API_URL}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      });
      setComments((prevComments) => prevComments.filter((comment) =>comment.id !==commentId ));
      alert('댓글이 성공적으로 삭제되었습니다.')
    } catch(error){
      console.error('댓글 삭제 오류:', error)
      alert('댓글 삭제에 실패했습니다.')
    }
  }
  



  if(loading){
    return <p>댓글을 불러오는 중입니다....</p>
  }
  return (
    <div className='commentList'>
      <h3>댓글</h3>
      {isAdding ? ( <CommentForm 
      setComments={setComments} 
      post_id={post_id}
      user_id={user_id}
      setIsAdding={setIsAdding}
    /*   onSubmit={handleAddComment} */
      onCancel={() => setIsAdding(false)}
       />): (
        <button className='addBtn' onClick={() => setIsAdding(true)}>댓글 작성</button>
      )}
     
      
      <hr />
      <div className="comment-list">
          {
            comments.length ===0 ? (
              <p>댓글을 작성해 보세요</p>
            ) : (
              comments.map((comment) => (
                <div className="itemList" key={comment.id}>
                  {
                    editingCommentId===comment.id? (
                      <div className='editForm'>
                        <textarea 
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        rows="3" ></textarea>
                        <button onClick={() => handleUpdate(comment.id)}>저장</button>
                        <button onClick={handleCancelEdit}>취소</button>
                      </div>

                    ) : (
                      <div>
                          <p>작성자 :<span> {comment.post_id} </span></p>
                        <br />
                        <p>{comment.content}</p>
                        <p>생성일 : {dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')} / 업데이트일 :{dayjs(comment.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</p>

                        <br />
                        <button onClick={()=>handleEdit(comment.id, comment.content)}>수정</button>
                        <button onClick={() => handleDelete(comment.id)}>삭제</button>
                      </div>
                    )
                  }
                 
                </div>
              ))
            )
          }
      </div>
    </div>
  );
};

export default CommentList;