import requestor from "./requestor";
import { ItemType, MPUser } from "../../types/types";
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
}): AxiosPromise<MPUser[]> => {
  const payload = {
    method: "GET",
    route: `/the-users?gid=${userId}`,
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
    url: payload.route,
    ...payload,
  } as AxiosRequestConfig);
};

export const becomeASeller = (sellerData: any): AxiosPromise => {
  const payload = {
    method: "POST",
    route: `/the-users`,
    data: { data: sellerData },
  };
  return requestor({
    url: payload.route,
    ...payload,
  } as AxiosRequestConfig);
};
