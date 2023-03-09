import axios from 'axios';

const apiConnection = axios.create(
  {
    baseURL: 'http://localhost:3001',
  },
);

apiConnection.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    const { token } = user;

    config.headers.Authorization = `${token}`;
    config.headers.Role = `${user.role}`;
  }

  return config;
});

export const requestData = async (endpoint) => {
  const { data } = await apiConnection.get(endpoint);
  return data;
};
export const requestLogin = async (endpoint, body) => {
  const { data } = await apiConnection.post(endpoint, body);
  return data;
};

export const requestUpdate = async (id, body) => {
  const { data } = await apiConnection.patch(`/sales/${id}`, body);
  return data;
};

export const requestDelete = async (endpoint, id) => {
  const { data } = await apiConnection.delete(endpoint, id);
  return data;
};

export default apiConnection;
