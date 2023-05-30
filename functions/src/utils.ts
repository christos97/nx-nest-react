import fetch from 'node-fetch';

/*The HTTP methods that can be used */
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 *
 * @param url The URL to call
 * @param data The data to send as JSON in the body - if provided, the method will be `POST`
 * @default undefined
 * @param {HTTPMethod} method The HTTP methods that can be used
 * @default `GET`
 * @returns The response data as `T` (generic)
 */
export const call = async <T = any>(
  url: string,
  data?: T,
  method: HTTPMethod = 'GET',
): Promise<T> => {
  if (data) method = 'POST';
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-FUNCTION-TRIGGER': 'true',
    },
    body: data ? JSON.stringify(data) : undefined,
  };

  try {
    const response = await fetch(url, options);
    const responseData = await response.json();
    return responseData as T;
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
};
