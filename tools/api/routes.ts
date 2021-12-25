import requestor from "./requestor";

export const getUserDetails = (params: any) => {
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

export const getUserType = ({ userId }: { userId: string }) => {
  const payload = {
    method: "GET",
    route: `/sellers?gid=${userId}`,
  };
  return requestor({
    method: payload.method,
    url: payload.route,
  });
};

export const getItemTypes = () => {
  const payload = {
    method: "GET",
    route: `/item-types`,
  };
  return requestor({
    method: payload.method,
    url: payload.route,
  });
};
