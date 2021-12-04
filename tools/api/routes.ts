import requestor from "./requestor";

const routes = {
  getUserDetails: (params) => {
    const payload = {
      method: "GET",
      route: "/user",
    };
    return requestor({
      method: payload.method,
      url: payload.route,
      params,
    });
  },
};

export default routes;
