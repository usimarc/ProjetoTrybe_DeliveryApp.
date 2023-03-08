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

    if (user.role === 'administrator') {
      config.headers.Admin = true;
    }
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

export const requestUpdate = async (endpoint, body) => {
  const { data } = await apiConnection.patch(endpoint, body);
  return data;
};

export const requestDelete = async (endpoint, id) => {
  const config = {
    headers: { Admin: true },
  };
  const { data } = await apiConnection.delete(endpoint, id, config);
  return data;
};

export default apiConnection;
