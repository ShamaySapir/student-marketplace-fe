import requestor from "./requestor";
import { ItemType, MPUser } from "../../types/types";
import { AxiosPromise, AxiosRequestConfig } from "axios";

export const getUserType = async ({
  userId,
}: {
  userId: string;
}): Promise<MPUser | null> => {
  const payload = {
    method: "GET",
    route: `/the-users?filters[googleId]=${userId}`,
  };
  const res = await requestor({
    method: payload.method,
    url: payload.route,
  } as AxiosRequestConfig);

  const userData = res.data.data?.[0];
  return userData ? { id: userData.id, ...userData.attributes } : null;
};

export const getItemTypes = async (): Promise<ItemType[]> => {
  const payload = {
    method: "GET",
    route: `/item-types`,
  };
  const res = await requestor({
    method: payload.method,
    url: payload.route,
  } as AxiosRequestConfig);
  return res.data.data.map((item: any) => ({
    id: item.id,
    ...item.attributes,
  })) as ItemType[];
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

export const addService = (itemData: any): AxiosPromise => {
  const payload = {
    method: "POST",
    route: `/items`,
    data: { data: itemData },
  };
  return requestor({
    url: payload.route,
    ...payload,
  } as AxiosRequestConfig);
};
