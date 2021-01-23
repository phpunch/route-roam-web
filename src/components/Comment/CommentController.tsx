import React, { useEffect, useState } from 'react';
import postService from '../../services/post.service';
import CommentBox from './CommentBox';
import CommentInput from './CommentInput';

interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  text: string;
}

interface CommentControllerProps {
  postId: string;
}

const CommentController: React.FunctionComponent<CommentControllerProps> = ({
  postId
}) => {
  const [comments, setcomments] = useState<Comment[] | null>(null)

  const [commentInput, setCommentInput] = useState<string>('')

  const getComments = async () => {
    try {
      const res = await postService.getComments(postId)
      setcomments(res.data.comments)
    } catch (e) {
      console.log(e)
    }
  }

  const addNewComment = (comment: Comment) => {
    console.log({comment})
    setcomments([...comments, comment])
  }

  const handleSendComment = async () => {
    try {
      const formData = new FormData()
      formData.append('postId', postId)
      formData.append('text', commentInput)
      const res = await postService.comment(formData)
      addNewComment(res.data.comment)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getComments()
  }, [])

  return (
    <>
      {comments && comments.map(comment => (
        <CommentBox username={comment.user_id} text={comment.text} />
      ))}
      <CommentInput
        value={commentInput}
        setValue={setCommentInput} 
        handleSendComment={handleSendComment} />
    </>
  );
};
export default CommentController;
