#!usr/bin/env node
import { getArgs } from './helpers/args.helper.js';
import { logError, logInfo, logSuccess } from './services/log.service.js';
import { saveConfig, getConfig } from './services/storage.service.js';
import { DICTIONARY } from './constants/constants.js';
import { getWeather } from './services/api.service.js'; 
import { HttpStatusCode } from 'axios';

const getHelp = () => {
  const message = [
    '',
    'Без параметров  - вывод погоды',
    '-c [CITY] - для установки города',
    '-t [API_KEY] - для установки токена',
  ];
  return message.join('\n');
}

const formatForcast = (weather) => {
  const data = [
    '',
    `Город: ${weather.name}`,
    weather?.weather[0]?.description ?? 'Неизвестно',
    `Температура: ${weather?.main?.temp}`,
  ];
  return data.join('\n')
}

const saveCity = async (city) => {
  if (!city?.length) {
    return logError('Не верно указан параметр для города');
  }

  try {
    await saveConfig(DICTIONARY.city, city);
    logSuccess('Город сохранён');
  } catch (error) {
    logError('Ошибка при сохранении города:', error.message);
  }
}

const saveToken = async (token) => {
  if (!token?.length) {
    return logError('Не верно указан параметр для токена');
  }

  try {
    await saveConfig(DICTIONARY.token, token);
    logSuccess('Токен сохранён');
  } catch (error) {
    logError('Ошибка при сохранении токена:', error.message);
  }
}

const updateConfig = async (args) => {
  args?.c && await saveCity(args.c);
  args?.t && await saveToken(args.t);
  return;
}

const getForcast = async () => {
  try {
    const city = await getConfig(DICTIONARY.city);
    if (!city) {
      throw Error('Не указан город, чтобы задать его используйте -c [CITY]');
    }
    const weather = await getWeather(city);
    const formattingWeather = formatForcast(weather);
    logSuccess(formattingWeather);
  } catch (err) {
    if (err?.response?.status === HttpStatusCode.NotFound) {
      logError('Проверьте на правильность наименование города, чтобы задать его используйте -c [CITY]')
    } else if (err?.response?.status === HttpStatusCode.Unauthorized) {
      logError('Неверный API ключ, проверьте его работоспособность и укажите через -t [API_KEY]')
    } else {
      logError(err.message);
    }
  }
}

const processing = async (args) => {
  if (args.h) {
    return logInfo(getHelp());
  }

  await updateConfig(args);
  return getForcast();
}

const bootstrap = () => {
  const args = getArgs(process.argv);
  console.log('Arguments:', args);
  return processing(args);
};

bootstrap();
