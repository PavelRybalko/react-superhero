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
    return axios
      .post<IHeroResponseData>('/', newHero)
      .then(({ data: { data } }) => {
        return data;
      });
  } catch (error) {
    console.log(error);
  }
};

const uploadImage = (heroId: string, data: FormData) => {
  try {
    return axios
      .patch<IUploadImageResponseData>(`/image/${heroId}`, data)
      .then(({ data: { data } }) => {
        return data;
      });
  } catch (error) {
    console.log(error);
  }
};

const removeHero = (heroId: string) => {
  try {
    return axios
      .delete<IHeroResponseData>(`/${heroId}`)
      .then(({ data: { data } }) => {
        return data;
      });
  } catch (error) {
    console.log(error);
  }
};

const updateHero = (heroId: string, hero: IHeroFormItem) => {
  try {
    return axios
      .put<IHeroResponseData>(`/${heroId}`, hero)
      .then(({ data: { data } }) => {
        return data.hero;
      });
  } catch (error) {
    console.log(error);
  }
};

const api = {
  fetchHeroes,
  addHero,
  removeHero,
  updateHero,
  uploadImage,
};

export default api;
