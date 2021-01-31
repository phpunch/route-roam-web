import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import PostService from '../src/services/post.service';
import PostCard from '../src/components/PostCard';
import withPrivateRoute from '../src/hoc/withPrivateRoute';
import postService from '../src/services/post.service';


interface Post {
  id: string;
  userId: string;
  username: string;
  text: string;
  images: string[];
  likes: string[]
}


const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const getAllPosts = async () => {
    try {
      const res = await PostService.getPosts();
      const respPosts = res.data.posts
      let newPosts = []
      for (let i = 0; i < respPosts.length; i++) {
        const respImages = respPosts[i].image_url.map(url => (
          process.env.API_BASE_URL + '/file/' + url
        ))
        newPosts = [...newPosts, {
          id: respPosts[i].id,
          userId: respPosts[i].user_id,
          username: respPosts[i].username,
          text: respPosts[i].text,
          images: respImages,
          likes: respPosts[i].liked_by
        }]

      }
      setPosts(newPosts.reverse())

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const handleDelete = async (postId: string) => {
    try {
      await postService.deletePost(postId)
      const newPosts = posts.filter((post) => post.id != postId)
      setPosts(newPosts)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          userId={post.userId}
          title={post.username}
          imageUrls={post.images}
          content={post.text}
          likesBy={post.likes}
          handleDelete={() => handleDelete(post.id)}
        />
      ))}
    </>
  );
}
export default withPrivateRoute(Feed)