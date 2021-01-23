import { time } from 'console';
import React, { useEffect, useRef, useState } from 'react';
import postService from '../../services/post.service';
import CommentBox from './CommentBox';
import CommentInput from './CommentInput';

interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  username: string
  text: string;
}

interface CommentControllerProps {
  postId: string;
}

const CommentController: React.FunctionComponent<CommentControllerProps> = ({
  postId
}) => {
  const [comments, setcomments] = useState<Comment[]>([])

  const [commentInput, setCommentInput] = useState<string>('')
  const ref = useRef<HTMLDivElement>(null)

  const getComments = async () => {
    try {
      const res = await postService.getComments(postId)
      setcomments(res.data.comments || [])
      setTimeout(() => {
        ref.current.scrollIntoView({
          behavior: "smooth"
        })
      }, 250)

    } catch (e) {
      console.log(e)
    }
  }

  const addNewComment = (comment: Comment) => {
    console.log({ comment })
    setcomments([...comments, comment])
  }

  const handleSendComment = async () => {
    try {
      console.log({ ref })
      const formData = new FormData()
      formData.append('postId', postId)
      formData.append('text', commentInput)
      const res = await postService.comment(formData)
      addNewComment(res.data.comment)
      ref.current.scrollIntoView({
        behavior: "smooth",
      })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getComments()

  }, [])

  return (
    <>
      {comments.map(comment => (
        <CommentBox key={comment.id} username={comment.username} text={comment.text} />
      ))}
      <div ref={ref}></div>
      <CommentInput
        value={commentInput}
        setValue={setCommentInput}
        handleSendComment={handleSendComment} />

    </>
  );
};
export default CommentController;
