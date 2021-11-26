import axios from 'axios';
import { IHero } from '../interfaces/Hero.interface';
import { IHeroFormItem } from '../interfaces/HeroFormItem.interface';
const BACKEND_URL = 'http://localhost:3001/api/heroes';

interface IDataResponse {
  code: number;
  status: string;
}

interface IGetHeroesResponseData extends IDataResponse {
  data: {
    heroes: IHero[];
    limit: string;
    page: string;
    total: string;
  };
}

interface IHeroResponseData extends IDataResponse {
  data: { hero: IHero };
}

interface IUploadImageResponseData extends IDataResponse {
  data: { imageUrl: string };
}

axios.defaults.baseURL = BACKEND_URL;

const fetchHeroes = ({ searchText = '', page = 1, pageSize = 5 }) => {
  try {
    return axios
      .get<IGetHeroesResponseData>(
        `/?&query=${searchText}&page=${page}&limit=${pageSize}`
      )
      .then(({ data }) => {
        return data;
      });
  } catch (error) {
    console.log(error);
  }
};

const addHero = (newHero: IHeroFormItem) => {
  try {
  } catch (error) {
    console.log(error);
  }
  return axios
    .post<IHeroResponseData>('/', newHero)
    .then(({ data: { data } }) => {
      return data;
    });
};

const uploadImage = (heroId: string, data: FormData) => {
  return axios
    .patch<IUploadImageResponseData>(`/image/${heroId}`, data)
    .then(({ data: { data } }) => {
      return data;
    });
};

const removeHero = (heroId: string) => {
  return axios
    .delete<IHeroResponseData>(`/${heroId}`)
    .then(({ data: { data } }) => {
      return data;
    });
};

const updateHero = (heroId: string, hero: IHeroFormItem) => {
  return axios
    .put<IHeroResponseData>(`/${heroId}`, hero)
    .then(({ data: { data } }) => {
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
