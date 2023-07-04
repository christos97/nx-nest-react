import axios, {
  type InternalAxiosRequestConfig,
  type AxiosRequestConfig,
  type CreateAxiosDefaults,
} from 'axios';
import { useMemo } from 'react';

import { BASE_URL, DEFAULT_HEADERS } from './constants';
import { useJwt } from './useJwt.hook';

export const useAxios = ({
  baseURL = BASE_URL,
  headers = {},
  timeout = 15000,
}: AxiosRequestConfig) => {
  const [jwtToken] = useJwt();

  const axiosInstance = useMemo(() => {
    const config: CreateAxiosDefaults = {
      timeout,
      baseURL,
      headers: {
        ...DEFAULT_HEADERS,
        ...headers,
      },
    };

    const instance = axios.create(config);
    instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      if (jwtToken) {
        config.headers.Authorization = `Bearer ${jwtToken}`;
      } else {
        delete config.headers.Authorization;
      }
      return config;
    });

    return instance;
  }, [jwtToken, baseURL, headers, timeout]);

  return axiosInstance;
};
