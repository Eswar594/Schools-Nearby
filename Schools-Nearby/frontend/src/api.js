import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // Update with deployed backend URL if needed
});

export default API;
