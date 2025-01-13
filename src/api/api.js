
import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const createComment = async (postId, userId, content) => {
  try {
    const response = await axios.post(`${API_URL}/comments`, { postId, userId, content });
    return response.data;
  } catch (error) {
    console.error('댓글 생성 오류:', error);
    throw error;
  }
};

export const getComments = async (postId) => {
  try {
    const response = await axios.get(`${API_URL}/comments/${postId}`);
    return response.data.comments;
  } catch (error) {
    console.error('댓글 조회 오류:', error);
    throw error;
  }
};

export const updateComment = async (id, content) => {
  try {
    const response = await axios.put(`${API_URL}/comments/${id}`, { content });
    return response.data;
  } catch (error) {
    console.error('댓글 수정 오류:', error);
    throw error;
  }
};

export const deleteComment = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/comments/${id}`);
    return response.data;
  } catch (error) {
    console.error('댓글 삭제 오류:', error);
    throw error;
  }
};

