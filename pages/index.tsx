import React, { useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import { useState } from 'react';
import PostService from '../src/services/post.service';
import PostCard from '../src/components/PostCard';

const Container = styled.form`
`;

interface Post {
  user_id: string;
  text: string;
  images: string[];
}

export default function Feed() {
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
          user_id: tmpPosts[i].user_id,
          text: tmpPosts[i].text,
          images: tmpImages,
        }]

      }
      setposts(newPosts)

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  console.log(posts)

  return (
    <Container>
      {posts.map((post) => (
        <>
          <PostCard title={post.text} subheader={post.text} imageUrls={post.images} content={post.text} />
        </>
      ))}
    </Container>
  );
}
