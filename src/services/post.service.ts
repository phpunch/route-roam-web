import axios from 'axios';
import authHeader from './auth-header';

class PostService {
  getPosts() {
    return axios.get(process.env.API_BASE_URL + '/posts', {
      headers: authHeader(),
    });
  }
  getFile(filepath: string) {
    return axios.get(process.env.API_BASE_URL + '/file/' + filepath, {
      headers: authHeader(),
    });
  }
  createPost(formData: FormData) {
    return axios.post(process.env.API_BASE_URL + '/post', formData, {
      headers: authHeader(),
    });
  }
  likePost(formData: FormData) {
    return axios.post(process.env.API_BASE_URL + '/like', formData, {
      headers: authHeader(),
    });
  }
  unlikePost(formData: FormData) {
    return axios.post(process.env.API_BASE_URL + '/unlike', formData, {
      headers: authHeader(),
    });
  }
  // 	router.POST("/comment", c.CommentPost)
  // 	router.GET("/comment/:postId", c.GetCommentsByPostID)
}

export default new PostService();
