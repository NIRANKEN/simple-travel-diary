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
        Authorization: `Bearer Allow ${process.env.REACT_APP_DUMMY_TOKEN}`,
      };
      return [url, config];
    } catch (e) {
      throw e;
    }
  },
});
