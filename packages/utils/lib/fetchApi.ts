import { parseUrl } from './urlHelper';
import { FetchApiError } from './fetchApiError';
import { parseResponse } from './responseHelper';

type RequestOptions = {
  params?: Record<string, any>;
} & RequestInit;

const customFetch = (url: string, options?: RequestInit) => {
  return fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });
};

const fetchApi = (baseUrl: string) => {
  return {
    async get<T>(path: string, options?: RequestOptions) {
      const res = await customFetch(parseUrl(baseUrl, path, options?.params), {
        ...options,
        method: 'GET',
      });

      if (!res.ok) {
        throw new FetchApiError(res.url, res.status, await res.json());
      }

      return (await parseResponse<T>(res)) as T;
    },
    async pose<T>(path: string, body?: any, options?: RequestOptions) {
      const res = await customFetch(parseUrl(baseUrl, path, options?.params), {
        ...options,
        body: JSON.stringify(body),
        method: 'POST',
      });

      if (!res.ok) {
        throw new FetchApiError(res.url, res.status, await res.json());
      }

      return await parseResponse<T>(res);
    },
    async put<T>(path: string, body?: any, options?: RequestOptions) {
      const res = await customFetch(parseUrl(baseUrl, path, options?.params), {
        ...options,
        body: JSON.stringify(body),
        method: 'PUT',
      });

      if (!res.ok) {
        throw new FetchApiError(res.url, res.status, await res.json());
      }

      return parseResponse<T>(res);
    },
    async delete<T>(path: string, options?: RequestOptions) {
      const res = await customFetch(parseUrl(baseUrl, path, options?.params), {
        ...options,
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new FetchApiError(res.url, res.status, await res.json());
      }

      return await parseResponse<T>(res);
    },
    async patch<T>(path: string, body?: any, options?: RequestOptions) {
      const res = await customFetch(parseUrl(baseUrl, path, options?.params), {
        ...options,
        body: JSON.stringify(body),
        method: 'PATCH',
      });

      if (!res.ok) {
        throw new FetchApiError(res.url, res.status, await res.json());
      }

      return await parseResponse<T>(res);
    },
  };
};

export default fetchApi;
