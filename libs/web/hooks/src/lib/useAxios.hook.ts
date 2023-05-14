import axios, { type AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import { useJwt } from './useJwt.hook';
import { BASE_URL, DEFAULT_HEADERS } from './constants';

export const useAxios = ({ baseURL = BASE_URL, headers = {}, timeout = 15000 }: AxiosRequestConfig) => {
  const [jwtToken] = useJwt();
  const axiosInstance = axios.create({
    timeout,
    baseURL,
    headers: {
      ...DEFAULT_HEADERS,
      ...headers,
    },
  });

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use((config) => {
      if (jwtToken) {
        config.headers.Authorization = `Bearer ${jwtToken}`;
      } else {
        delete config.headers.Authorization;
      }
      return config;
    });

    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, [jwtToken, axiosInstance]);

  return [axiosInstance];
};
