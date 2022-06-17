import requestor from "./requestor";

import {
  ItemType,
  MPUser,
  GroupedItems,
  Service,
  DescriptionItem,
  PurchaseData,
  GetUserIdPayload,
  UserPurchases,
  RankedItem,
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
    route: `/serviceGroup`,
  };
  try {
    const res = await getBaseRequestor({
      method: payload.method,
      url: payload.route,
    });
    if (res.status !== 200) throw new Error("Not implemented");
    return res.data as ItemType[];
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
    url: payload.route,
    ...payload,
  } as AxiosRequestConfig);
};

export const getUserDetails = async ({ userId }: { userId: string }) => {
  const payload = {
    method: "GET",
    route: `/user/${userId}`,
  };
  return getBaseRequestor({
    url: payload.route,
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
    return res.data;
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
      method: "PATCH",
      route: `/user/update/${userData.googleId}`,
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
    route: `/items/add`,
    data: itemData,
  };
  return getBaseRequestor({
    url: payload.route,
    ...payload,
  } as AxiosRequestConfig);
};

export const getService = async ({
  itemId,
}: {
  itemId: string;
}): Promise<Service> => {
  const payload = {
    method: "GET",
    route: `/items/fullDetails/${itemId}`,
  };
  const res = await getBaseRequestor({
    url: payload.route,
    ...payload,
  } as AxiosRequestConfig);
  const { id, image, price, rating, serviceGroup, title, description, seller } =
    res.data;
  const sellerDesc = seller.description;
  const sellerPhone = seller.phoneNumber;
  const sellerName = seller.displayName;
  const walletNumber = seller.walletNumber;
  const serviceItem = {
    id,
    image,
    price: +price,
    rating,
    serviceGroup,
    title,
    description,
    sellerDesc,
    sellerPhone,
    walletNumber,
    sellerName,
  };
  return serviceItem;
};

export const postUploadImage = (imageFiles: FileList): AxiosPromise => {
  const bodyFormData = new FormData();
  bodyFormData.append("files", imageFiles[0]);

  const payload = {
    method: "POST",
    route: `/items/uploadImg`,
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  };
  return getBaseRequestor({
    url: payload.route,
    ...payload,
  } as AxiosRequestConfig);
};

export const patchUpdateRating = ({
  itemId,
  rating,
  userId,
}: {
  itemId: string;
  rating: string;
  userId: string;
}): AxiosPromise => {
  const payload = {
    method: "PATCH",
    route: `/rating/update/${itemId}`,
    data: {
      userId,
      score: rating,
      itemId,
    },
  };
  return getBaseRequestor({
    url: payload.route,
    ...payload,
  } as AxiosRequestConfig);
};
export const postPurchase = (data: PurchaseData): AxiosPromise => {
  const payload = {
    method: "POST",
    route: `/purchase/submit`,
    data,
  };
  return getBaseRequestor({
    url: payload.route,
    ...payload,
  } as AxiosRequestConfig);
};

export const getPurchases = async (
  data: GetUserIdPayload
): Promise<UserPurchases[]> => {
  const payload = {
    method: "GET",
    route: `/history/purchase/${data.userId}`,
    data,
  };
  const resp = await getBaseRequestor({
    url: payload.route,
    ...payload,
  } as AxiosRequestConfig);
  return resp.data;
};

export const getUserSells = async (
  data: GetUserIdPayload
): Promise<UserPurchases[]> => {
  const payload = {
    method: "GET",
    route: `/history/sell/${data.userId}`,
    data,
  };
  const resp = await getBaseRequestor({
    url: payload.route,
    ...payload,
  } as AxiosRequestConfig);
  return resp.data;
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
  return items;
};

export const getUserRankedItems = async (
  data: GetUserIdPayload
): Promise<RankedItem[]> => {
  const payload = {
    method: "GET",
    route: `/rating/${data.userId}`,
    data,
  };
  const resp = await getBaseRequestor({
    url: payload.route,
    ...payload,
  } as AxiosRequestConfig);
  return resp.data;
};
