// src/config.js
export const getAuthConfig = () => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAuthConfigFile = () => {
  const token = localStorage.getItem('access');
  return {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };
};
