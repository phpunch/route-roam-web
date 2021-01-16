import axios from 'axios';
import authHeader from './auth-header';

class UserService {
  getPosts() {
    return axios.get(process.env.API_BASE_URL + '/posts', { headers: authHeader() });
  }
  // createPost(text, filepath) {
  //   return axios.post(process.env.API_BASE_URL + '/post', { headers: authHeader(), data: form } )
  // }

  // router.POST("/post", c.CreatePost)
	// 	router.POST("/like", c.LikePost)
	// 	router.POST("/unlike", c.UnlikePost)
	// 	router.GET("/posts", c.GetPosts)
	// 	router.POST("/comment", c.CommentPost)
	// 	router.GET("/comment/:postId", c.GetCommentsByPostID)
}

export default new UserService();