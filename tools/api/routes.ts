import requestor from "./requestor";
import { ItemType, MarketplaceUser } from "../../types/types";
import { AxiosPromise, AxiosRequestConfig } from "axios";
export const getUserDetails = (params: any) => {
  const payload = {
    method: "GET",
    route: "/user",
  };
  return requestor({
    method: payload.method,
    url: payload.route,
    params,
  } as AxiosRequestConfig);
};

export const getUserType = ({
  userId,
}: {
  userId: string;
}): AxiosPromise<MarketplaceUser[]> => {
  const payload = {
    method: "GET",
    route: `/sellers?gid=${userId}`,
  };
  return requestor({
    method: payload.method,
    url: payload.route,
  } as AxiosRequestConfig);
};

export const getItemTypes = (): AxiosPromise<ItemType[]> => {
  const payload = {
    method: "GET",
    route: `/item-types`,
  };
  return requestor({
    method: payload.method,
    url: payload.route,
  } as AxiosRequestConfig);
};

export const postUploadImage = (imageFiles: FileList): AxiosPromise => {
  const bodyFormData = new FormData();
  bodyFormData.append("files", imageFiles[0]);

  const payload = {
    method: "POST",
    route: `/upload`,
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  };
  return requestor({
    method: payload.method,
    url: payload.route,
    ...payload,
  } as AxiosRequestConfig);
};
