import React, {useLayoutEffect, useState} from 'react';
import {
  getComments as getCommentsApi,
  addComment as addCommentApi,
  deleteComment as deleteCommentApi,
  updateComment as updateCommentApi
} from '../../api';
import Comment from '../Comment/Comment';
import CommentForm from '../CommentForm/CommentForm';
import {CommentFormTitle, CommentsContainer, CommentsTitle, CommentsWrap, LoaderText} from './styled';

const Comments = ({currentUserId}) => {
  const [comments, setComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const rootComments = comments.filter(comment => comment.parentId === null);

  useLayoutEffect(() => {
    setIsLoading(true);
    getCommentsApi()
      .then(({data}) => setComments(data))
      .catch(e => alert(e.message))
      .finally(() => setIsLoading(false));
  }, []);

  const getReplies = id => {
    return comments.filter(comment => comment.parentId === id).sort(
      (a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
  }

  const addComment = (text, parentId) => {
    const newComment = {
      body: text,
      parentId: parentId ? parentId : null,
      userId: '1',
      username: 'John',
      createdAt: new Date().toISOString()
    }
    addCommentApi(newComment).then(({data}) => {
      setComments([...comments, data]);
      setActiveComment(null)
    });
  }

  const handleUpdateComment = (text, commentId) => {
    updateCommentApi(commentId, {body: text}).then(() => {
      const updatedComments = comments.map(comment => {
        if (comment.id === commentId) {
          return {...comment, body: text}
        }
        return comment
      });

      setComments(updatedComments);
      setActiveComment(null);
    })
  }

  const handleDeleteComment = (commentId) => {
    if (window.confirm('Delete comment? Are you sure?')) {
      deleteCommentApi(commentId).then(() => {
        setComments([...comments.filter(item => item.id !== commentId)]);
      });
    }
  }

  return (
    <CommentsWrap>
      <CommentsTitle>Comments</CommentsTitle>
      {
        isLoading
          ? <LoaderText>Loading comments. Please wait...</LoaderText>
          : (
            <>
              <CommentsContainer>
                {rootComments.map(item => (
                  <Comment
                    key={item.id}
                    comment={item}
                    replies={getReplies(item.id)}
                    currentUserId={currentUserId}
                    deleteComment={handleDeleteComment}
                    activeComment={activeComment}
                    setActiveComment={setActiveComment}
                    addComment={addComment}
                    updateComment={handleUpdateComment}
                  />
                ))}
              </CommentsContainer>

              <CommentFormTitle>Add a comment</CommentFormTitle>
              <CommentForm
                submitLabel={'Add comment'}
                handleSubmit={addComment}
              />
            </>
          )
      }
    </CommentsWrap>
  );
};

export default Comments;