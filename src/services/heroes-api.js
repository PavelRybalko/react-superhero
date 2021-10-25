import axios from 'axios';
const BACKEND_URL = 'http://localhost:3001/api/heroes';

axios.defaults.baseURL = BACKEND_URL;

const fetchHeroes = ({ page = 1, pageSize = 5 }) => {
  return axios.get(`/?&page=${page}&limit=${pageSize}`).then(({ data }) => {
    return data;
  });
};

const addHero = (hero) => {
  return axios.post('/', hero).then(({ data: { data } }) => {
    return data;
  });
};

const uploadImage = (heroId, image) => {
  return axios.patch(`/image/${heroId}`, image).then(({ data: { data } }) => {
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
    return data;
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
