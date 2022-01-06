import requestor from "./requestor";
import {
  ItemType,
  MPUser,
  GroupedItems,
  DescriptionItem,
} from "../../types/types";
import { AxiosPromise, AxiosRequestConfig } from "axios";
import { groupBy, reduce } from "lodash";
const getBaseRequestor = (args: any) => {
  return requestor({
    ...args,
    baseURL: process.env.NEXT_PUBLIC_MARKETPLACE_API,
  } as AxiosRequestConfig);
};

const getStrapiRequestor = (args: any) => {
  return requestor({
    ...args,
    baseURL: process.env.NEXT_PUBLIC_MARKETPLACE_API_STRAPI,
  } as AxiosRequestConfig);
};

export const getItemTypes = async (): Promise<ItemType[]> => {
  const payload = {
    method: "GET",
    route: `/item-types`,
  };
  try {
    const res = await getBaseRequestor({
      method: payload.method,
      url: payload.route,
    });
    if (res.status !== 200) throw new Error("Not implemented");
    return res.data.map((item: any) => ({
      id: item.id,
      ...item.attributes,
    })) as ItemType[];
  } catch (e: any) {
    const res = await getStrapiRequestor({
      method: payload.method,
      url: payload.route,
    });
    return res.data.data.map((item: any) => ({
      id: item.id,
      ...item.attributes,
    })) as ItemType[];
  }
};

export const deleteUser = async ({ userId }: { userId: string }) => {
  const payload = {
    method: "DELETE",
    route: `/user/delete/${userId}`,
  };
  return getBaseRequestor({
    ...payload,
  } as AxiosRequestConfig);
};

export const getUserType = async ({
  userId,
}: {
  userId: string;
}): Promise<MPUser | null> => {
  try {
    const payload = {
      method: "GET",
      route: `/user/isseller/${userId}`,
    };

    const res = await getBaseRequestor({
      method: payload.method,
      url: payload.route,
    } as AxiosRequestConfig);

    if (res.status !== 200) throw new Error("Not implemented");
    const userData = res.data[0];
    return userData ? { id: userData.id, ...userData.attributes } : null;
  } catch (e: any) {
    const payload = {
      method: "GET",
      route: `/the-users?filters[googleId]=${userId}`,
    };
    const res = await getStrapiRequestor({
      method: payload.method,
      url: payload.route,
    } as AxiosRequestConfig);

    const userData = res.data.data?.[0];
    return userData ? { id: userData.id, ...userData.attributes } : null;
  }
};

export const updateUser = (userData: any): any => {
  try {
    const payload = {
      method: "POST",
      route: `/user/register`,
      data: userData,
    };
    return getBaseRequestor({
      url: payload.route,
      ...payload,
    } as AxiosRequestConfig);
  } catch (e: any) {
    const payload = {
      method: "POST",
      route: `/the-users`,
      data: { data: userData },
    };
    return getStrapiRequestor({
      url: payload.route,
      ...payload,
    } as AxiosRequestConfig);
  }
};

export const addService = (itemData: any): AxiosPromise => {
  const payload = {
    method: "POST",
    route: `/items`,
    data: itemData,
    // data: { data: itemData },
  };
  return getStrapiRequestor({
    url: payload.route,
    ...payload,
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
  return getStrapiRequestor({
    url: payload.route,
    ...payload,
  } as AxiosRequestConfig);
};

const makeRepeated = (arr: any, repeats: number) =>
  [].concat(...Array.from({ length: repeats }, () => arr));

export const getDisplayTileData = async (): Promise<GroupedItems> => {
  const payload = {
    method: "GET",
    route: `/items/preview`,
  };
  const res = await getBaseRequestor({
    url: payload.route,
    ...payload,
  } as AxiosRequestConfig);
  const parsedRes = res.data.map((item: DescriptionItem) => ({
    ...item,
    rating: +item.rating,
    price: +item.price,
  }));
  const items = groupBy(parsedRes, "serviceGroup");
  const itemsDuplicated = reduce(
    items,
    (acc, itemsList, category) => ({
      ...acc,
      [category]: makeRepeated(itemsList, 100),
    }),
    {}
  );
  return itemsDuplicated;
};
