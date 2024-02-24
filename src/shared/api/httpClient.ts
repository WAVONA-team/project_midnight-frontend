import {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

import { createClient } from '../http';

export const httpClient = createClient();

const onRequest = (request: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken && request.headers) {
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return request;
};

const onResponseSuccess = (response: AxiosResponse) => {
  return response;
};

const onResponseError = async (error: AxiosError) => {
  const originalRequest = error.config;

  if (error.response?.status !== 401) {
    throw error;
  }

  const { accessToken } = (await httpClient.get('/refresh')).data;

  localStorage.save('accessToken', accessToken);

  return httpClient.request(originalRequest!);
};

httpClient.interceptors.request.use(onRequest);
httpClient.interceptors.response.use(onResponseSuccess, onResponseError);
