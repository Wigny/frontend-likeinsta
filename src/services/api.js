import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:8080'
  baseURL: 'https://backend-likeinsta.herokuapp.com'
});

export default api;