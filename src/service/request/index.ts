import { getServiceEnvConfig } from '~/.env-config';
import { createRequest } from './request';

const { url, proxyPattern } = getServiceEnvConfig(import.meta.env);

const isHttpProxy = import.meta.env.VITE_HTTP_PROXY === 'Y';

export const request = createRequest({ baseURL: isHttpProxy ? proxyPattern : url });

const baseURL = import.meta.env.VITE_BASE_API
export const mockRequest = createRequest({ baseURL });