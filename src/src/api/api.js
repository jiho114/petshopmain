import axios from 'axios';

const API_URL = 'http://localhost:8080';

// 댓글 생성
export const createComment = async (post_id, user_id, content) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.post(
      `${API_URL}/comments`,
      { post_id, user_id, content },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('댓글 생성 오류:', error.response?.data || error.message);
    throw error;
  }
};

// 댓글 전체 가져오기
export const getComments = async () => {
  try {
    const response = await axios.get(`${API_URL}/comments`);
    console.log(response.data); // 서버 응답 확인
    return response.data.comments; // 서버 데이터 구조에 따라 수정 필요
  } catch (error) {
    console.error('댓글 조회 오류:', error.response?.data || error.message);
    throw error;
  }
};

// 특정 포스트의 댓글 조회
export const getComment = async (post_id) => {
  try {
    const response = await axios.get(`${API_URL}/comments/${post_id}`);
    return response.data.comments; // 서버 데이터 구조에 따라 수정 필요
  } catch (error) {
    console.error('댓글 조회 오류:', error.response?.data || error.message);
    throw error;
  }
};
