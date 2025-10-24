import axios from 'axios';

export const axiosAuth = axios.create({
  baseURL: 'https://retro-gaming-store-dopp.onrender.com',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});
