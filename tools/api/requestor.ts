import axios from "axios";

const instance = axios.create({});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const baseUrl = error.config.baseURL;
    const mpApiStrapi = process.env.NEXT_PUBLIC_MARKETPLACE_API_STRAPI;
    if (
      error.config.baseURL === process.env.NEXT_PUBLIC_MARKETPLACE_API_STRAPI
    ) {
      return Promise.reject(error.response.data.error);
    }
    return Promise.reject(error);
  }
);

export default instance;
