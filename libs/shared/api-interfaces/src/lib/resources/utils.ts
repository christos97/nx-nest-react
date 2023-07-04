import { call } from '@ntua-saas-10/shared-call';
import { HttpMethod, HttpAction } from '@ntua-saas-10/shared-consts';

import { ResourcePath } from './constants';

const { GET, POST, PATCH, DELETE } = HttpMethod;
const { list, retrieve, create, update, remove } = HttpAction;

export interface CrudResourceGenConfig {
  resourcePath: ResourcePath;
  baseUrl?: string;
}

export const crudResourceGen = <T>({ resourcePath, baseUrl }: CrudResourceGenConfig) =>
  ({
    [list]: (): Promise<Array<T>> =>
      call<Array<T>>({ url: resourcePath, method: GET, baseUrl }), // prettier-ignore
    [retrieve]: (id: string): Promise<T> =>
      call<T>({ url: `${resourcePath}/${id}`, method: GET, baseUrl }),
    [create]: (body: T): Promise<T> =>
      call<T>({ url: resourcePath, method: POST, data: body, baseUrl }),
    [update]: (id: string, body: Partial<T>): Promise<Partial<T>> =>
      call<Partial<T>>({ url: `${resourcePath}/${id}`, method: PATCH, data: body, baseUrl }),
    [remove]: (id: string): Promise<T> =>
      call<T>({ url: `${resourcePath}/${id}`, method: DELETE, baseUrl }),
  } as const);

export interface Resource<T> {
  [key: string]: (...args: T[]) => Promise<T>;
}
export interface ResourceGenConfig<T> {
  baseUrl: string;
  method: HttpMethod;
  path: string;
  data?: T;
}

export const resourceGen = <T>({ baseUrl, method, path, data }: ResourceGenConfig<T>) =>
  call<T>({ baseUrl, method, url: path, data });
