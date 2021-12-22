import requestor from "./requestor";

export const getUserDetails = (params) => {
  const payload = {
    method: "GET",
    route: "/user",
  };
  return requestor({
    method: payload.method,
    url: payload.route,
    params,
  });
};

export const getUserType = ({ userId }) => {
  const payload = {
    method: "GET",
    route: `/sellers?gid=${userId}`,
  };
  return requestor({
    method: payload.method,
    url: payload.route,
  });
};
