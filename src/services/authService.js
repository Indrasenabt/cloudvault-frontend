import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api/auth';


export const register = async (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const login = async (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};

