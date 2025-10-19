import axios from 'axios';

export const axiosAuth = axios.create({
  baseURL: 'https://tu-backend.com',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});
