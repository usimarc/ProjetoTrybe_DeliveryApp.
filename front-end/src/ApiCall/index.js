import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};
export const requestLogin = async (endpoint, { email, password }) => {
  const { data } = await api.post(endpoint, { email, password });
  return data;
};
export default api;
