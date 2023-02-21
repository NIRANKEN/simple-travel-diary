import { FetchInterceptor } from 'fetch-intercept';

export const fetchInterceptor = (): FetchInterceptor => ({
  request: async (url, config) => {
    if (!config) {
      config = {};
    }
    if (!config.headers) {
      config.headers = {};
    }
    try {
      config.headers = {
        ...config.headers,
        Authorization: 'Bearer Allow niranken-simple-travel-diary',
      };
      return [url, config];
    } catch (e) {
      throw e;
    }
  },
});
