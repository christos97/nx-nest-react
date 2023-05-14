import { HttpMethod } from '../consts';

/**
 * The `HttpMethod` of a request.
 */
export type HttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod];
