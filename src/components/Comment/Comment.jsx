import React from 'react';
import CommentForm from '../CommentForm/CommentForm';
import {
  ActionButtons,
  CommentAction,
  CommentAuthor,
  CommentContent,
  CommentImg,
  CommentItem,
  CommentText, DateWrap, RepliesWrap
} from './styled';

const Comment = ({
                   comment,
                   replies,
                   currentUserId,
                   deleteComment,
                   activeComment,
                   setActiveComment,
                   parentId = null,
                   addComment,
                   updateComment
                 }) => {
  const commentEditableTimeout = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > commentEditableTimeout;
  const canReply = !!currentUserId;
  const canEdit = currentUserId === comment.userId && !timePassed;
  const canDelete = currentUserId === comment.userId && !timePassed;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  const isReplying = activeComment && activeComment.type === 'replying' && activeComment.id === comment.id;
  const isEditing = activeComment && activeComment.type === 'editing' && activeComment.id === comment.id;
  const replyId = parentId ? parentId : comment.id;

  return (
    <CommentItem>
      <CommentImg>
        <img src="https://cdn-icons-png.flaticon.com/512/236/236832.png" alt="alt"/>
      </CommentImg>
      <div className="comment-right-part">
        <CommentContent>
          <CommentAuthor>{comment.username}</CommentAuthor>
          <DateWrap>{createdAt}</DateWrap>
        </CommentContent>

        {!isEditing && <CommentText>{comment.body}</CommentText>}
        {isEditing && (
          <CommentForm
            submitLabel={'Update'}
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => setActiveComment(null)}
            hasCancelButton
          />
        )}

        <ActionButtons>
          {canReply && (
            <CommentAction onClick={() => setActiveComment({id: comment.id, type: 'replying'})}>
              Reply
            </CommentAction>
          )}

          {canEdit && (
            <CommentAction onClick={() => setActiveComment({id: comment.id, type: 'editing'})}>
              Edit
            </CommentAction>
          )}

          {canDelete && <CommentAction onClick={() => deleteComment(comment.id)}>Delete</CommentAction>}
        </ActionButtons>

        {isReplying && (
          <CommentForm submitLabel={'Reply'} handleSubmit={(text) => addComment(text, replyId)} />
        )}

        {replies.length > 0 && (
          <RepliesWrap>
            {replies.map(reply => (
              <Comment
                comment={reply}
                key={reply.id}
                replies={[]}
                currentUserId={currentUserId}
                deleteComment={deleteComment}
                parentId={comment.id}
                addComment={addComment}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
              />))}
          </RepliesWrap>
        )}
      </div>
    </CommentItem>
  );
};

export default Comment;