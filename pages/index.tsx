import React, { useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import { useState } from 'react';
import PostService from '../src/services/post.service';
import PostCard from '../src/components/PostCard';

const Container = styled.form`
`;

interface Post {
  id: string;
  userId: string;
  text: string;
  images: string[];
  likes: string[]
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
          id: tmpPosts[i].id,
          userId: tmpPosts[i].user_id,
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
    <Container>
      {posts.map((post) => (
        <>
          <PostCard
            id={post.id}
            userId={post.userId}
            title={post.text}
            subheader={post.text}
            imageUrls={post.images}
            content={post.text}
            likes={post.likes}
          />
        </>
      ))}
    </Container>
  );
}
