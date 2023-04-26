import axios from 'axios';
import { useJwt } from './useJwt.hook';
import { useEffect } from 'react';

interface UseAxiosInstanceOptions {
  baseUrl?: string;
}

const axiosInstance = axios.create({ timeout: 10000 });

export const useAxiosInstance = (options?: UseAxiosInstanceOptions) => {
  axiosInstance.defaults.baseURL = options?.baseUrl;
  const [jwtToken] = useJwt();

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
  }, [jwtToken]);

  return [axiosInstance];
};
