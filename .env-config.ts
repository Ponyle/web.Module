/** 请求服务的环境配置 */
type ServiceEnv = Record<ServiceEnvType, ServiceEnvConfig>;

/** 不同请求服务的环境配置 */
const serviceEnv: ServiceEnv = {
  dev: {

		url: 'https://yjgf.mengoo.com',
		proxyPattern: '/mengoo',
		secondUrl: 'https://yjgf.mengoo.com',
		secondUrlPattern: '/upload'
  },
  test: {
    url: 'http://192.168.2.115:8001/',
    urlPattern: '/upload',
    secondUrl: 'http://192.168.2.140:8599',
    secondUrlPattern: '/xnfz'
  },
  prod: {
    url: 'http://192.168.2.200:90',
    urlPattern: '/mengoo',
    secondUrl: 'http://192.168.2.200:8060',
    secondUrlPattern: '/uploadImg'
  }
};

/**
 * 获取当前环境模式下的请求服务的配置
 * @param env 环境
 */
export function getServiceEnvConfig(env: ImportMetaEnv) {
  const { VITE_SERVICE_ENV = 'dev' } = env;
  const config = serviceEnv[VITE_SERVICE_ENV];
  return config;
}
