import axios from 'axios';

const API_KEY = 'SFmKtG9NYf12kjl6rMXdZfpzx6m2DmnJYCWDwrJNOiH4MYyVGqxbbrWr';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getImages = async (query, page) => {
  const { data } = await axios.get(`search?query=${query}&page=${page}`);
  return data;
};
