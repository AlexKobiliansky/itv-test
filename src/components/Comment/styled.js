import styled from 'styled-components';

export const CommentItem = styled.div`
  display: flex;
  margin-bottom: 28px;
`;

export const CommentImg = styled.div`
  margin-right: 12px;
  img {
    width: 80px;
    height: auto;
  }
`;

export const CommentContent = styled.div`
  display: flex;
`;

export const CommentAuthor = styled.div`
  margin-right: 8px;
  font-size: 20px;
  color: green;
`;

export const CommentText = styled.div`
  font-size: 18px;
`;

export const RepliesWrap = styled.div`
  margin-top: 20px;
`;

export const ActionButtons = styled.div`
  display: flex;
  font-size: 12px;
  color: rgb(51, 51, 51);
  cursor: pointer;
  margin-top: 8px;
`;

export const CommentAction = styled.div`
  margin-right: 8px;
`;

export const DateWrap = styled.div`
  font-size: 12px;
  margin-left: 20px;
`