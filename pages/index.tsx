import React, { useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import { useState } from 'react';
import PostService from '../src/services/post.service';
import PostCard from '../src/components/PostCard';
import withPrivateRoute from '../src/hoc/withPrivateRoute';


interface Post {
  id: string;
  userId: string;
  username: string;
  text: string;
  images: string[];
  likes: string[]
}

const Feed = () => {
  const [posts, setposts] = useState<Post[]>([]);

  const getAllPosts = async () => {
    try {
      const res = await PostService.getPosts();
      console.log({ res })
      const tmpPosts = res.data.posts
      let newPosts = []
      for (let i = 0; i < tmpPosts.length; i++) {
        const tmpImages = tmpPosts[i].image_url.map(url => (
          process.env.API_BASE_URL + '/file/' + url
        ))
        newPosts = [...newPosts, {
          id: tmpPosts[i].id,
          userId: tmpPosts[i].user_id,
          username: tmpPosts[i].username,
          text: tmpPosts[i].text,
          images: tmpImages,
          likes: tmpPosts[i].liked_by
        }]

      }
      setposts(newPosts.reverse())

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  console.log(posts)

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
        />
      ))}
    </>
  );
}
export default withPrivateRoute(Feed)