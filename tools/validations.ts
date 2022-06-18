import * as yup from "yup";
export const DISPLAY_NAME_VALIDATION = {
  displayName: yup
    .string()
    .min(3, "Minimum length is 3 characters")
    .max(20, "Maximum length is 20 characters")
    .matches(/^[A-Za-z ]+$/, "Should contain only letters!")
    .required("Required"),
};

export const SELLER_DESC_VALIDATION = {
  sellerDesc: yup
    .string()
    .min(10, "Minimum length is 10 characters")
    .max(500, "Maximum length is 500 characters")
    .required("Required"),
};
export const WALLET_NUMBER_VALIDATION = {
  walletNumber: yup
    .string()
    .min(3, "Minimum length is 3 characters")
    .max(50, "Maximum length is 50 characters")
    .required("Required"),
};

export const PHONE_NUMBER_VALIDATION = {
  phone: yup
    .number()
    .min(1000000000, "Should contain only numbers")
    .max(9999999999, "Should contain only numbers")
    .required("Required"),
};

export const ITEM_TYPE_ID_VALIDATION = {
  itemTypeId: yup.string().required("Category must be specified"),
  itemName: yup
    .string()
    .min(5, "Minimum length is 5 characters")
    .max(25, "Maximum length is 25 characters")
    .required("Required"),
};
export const ITEM_DESC_VALIDATION = {
  itemDesc: yup
    .string()
    .min(10, "Minimum length is 10 characters")
    .max(500, "Maximum length is 500 characters")
    .required("Required"),
};
export const ITEM_PRICE_VALIDATION = {
  itemPrice: yup
    .number()
    .min(0, "Minimum price must be 0")
    .required("Required"),
};
