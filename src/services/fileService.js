import axios from './axiosInstance';

export const uploadFile = (formData) => {
  // Don't create a new FormData - use the one passed from component
  return axios.post('/files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getMyFiles = () => {
  return axios.get('/files/mine');
};

export const deleteFile = (id) => {
  return axios.delete(`/files/${id}`);
};