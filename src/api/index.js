import * as axios from "axios";

const baseUrl = process.env.REACT_APP_SMALL_SIZE_DATA_URL

const instance = axios.create({
  baseURL: baseUrl,
});

export const getComments = () => {
  return instance.get(`comments/`);
}

export const addComment = (comment) => {
  return instance.post(`comments/`, comment);
}

export const deleteComment = (commentId) => {
  return instance.delete(`comments/${commentId}`);
}

export const updateComment = (id, object) => {
  return instance.patch(`comments/${id}`, object);
}