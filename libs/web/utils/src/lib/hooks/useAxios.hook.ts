import axios from 'axios';
import { useEffect } from 'react';
import { useJwt } from './useJwt.hook';
import { env } from '@ntua-saas-10/web/env';

const axiosInstance = axios.create({ timeout: 10000 });

axiosInstance.defaults.baseURL = env.VITE_PUBLIC_API;
axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';
axiosInstance.defaults.headers.common['Accept'] = 'application/json';

export const useAxios = () => {
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
