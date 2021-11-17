import axios from 'axios';
const BACKEND_URL = 'http://localhost:3001/api/heroes';

axios.defaults.baseURL = BACKEND_URL;

const fetchHeroes = ({ page = 1, pageSize = 5 }) => {
  return axios.get(`/?&page=${page}&limit=${pageSize}`).then(({ data }) => {
    return data;
  });
};

const addHero = (newHero) => {
  return axios.post('/', newHero).then(({ data: { data } }) => {
    return data;
  });
};

const uploadImage = (heroId, data) => {
  return axios.patch(`/image/${heroId}`, data).then(({ data: { data } }) => {
    return data;
  });
};

const removeHero = (heroId) => {
  return axios.delete(`/${heroId}`).then(({ data: { data } }) => {
    return data;
  });
};

const updateHero = (heroId, hero) => {
  return axios.put(`/${heroId}`, hero).then(({ data: { data } }) => {
    return data.hero;
  });
};

const api = {
  fetchHeroes,
  addHero,
  removeHero,
  updateHero,
  uploadImage,
};

export default api;
