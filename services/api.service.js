import { DICTIONARY } from '../constants/constants.js';
import { getConfig } from './storage.service.js';
import axios from 'axios';

export const getWeather = async (city) => {
  const token = await getConfig(DICTIONARY.token);
  if (!token) {
    throw new Error('Не задан API ключ, задайте через команду -d [API_KEY]');
  }

  const { data, status } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city,
      appid: token,
      lang: 'ru',
      units: 'metric',
    },
  });
  return data;
}
