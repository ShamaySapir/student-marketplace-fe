import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import { useFormik } from "formik";
import * as routes from "../tools/api/routes";
import * as yup from "yup";
import { map, pick } from "lodash";
import { ItemType } from "../types/types";
const validationSchema = yup.object({
  itemType: yup.number().required("Required"),
  itemName: yup
    .string()
    .min(2, "Too Short!")
    .max(25, "Too Long!")
    .required("Required"),
  itemDesc: yup
    .string()
    .min(10, "Too Short!")
    .max(25, "Too Long!")
    .required("Required"),
  itemPrice: yup
    .number()
    .min(0, "Too cheap")
    .max(25, "Too expensive")
    .required("Required"),
});

export default function BecomeASellerForm() {
  const [itemTypes, setItemTypes] = useState<ItemType[]>([]);

  useEffect(() => {
    async function getItemTypes() {
      const routeTypes = await routes.getItemTypes();
      const resJson = routeTypes.data?.data;
      const items = map(resJson, (type) => ({
        name: type.attributes.name,
        id: type.id,
      }));
      setItemTypes(items);
    }
    getItemTypes();
  }, []);

  const formik = useFormik({
    initialValues: {
      itemType: itemTypes?.[0]?.id,
      itemName: "",
      itemDesc: "",
      itemPrice: 0.0,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="itemType"
        select
        label="Type"
        value={formik.values.itemType}
        onChange={formik.handleChange("itemType")}
        error={formik.touched.itemType && Boolean(formik.errors.itemType)}
        margin="normal"
        fullWidth
      >
        {map(itemTypes, ({ id, name }) => (
          <MenuItem value={id} key={id}>
            {name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        id="itemName"
        label="Name"
        value={formik.values.itemName}
        onChange={formik.handleChange}
        error={formik.touched.itemName && Boolean(formik.errors.itemName)}
        helperText={formik.touched.itemName && formik.errors.itemName}
      />
      <TextField
        fullWidth
        multiline
        id="itemDesc"
        label="Description"
        value={formik.values.itemDesc}
        onChange={formik.handleChange}
        error={formik.touched.itemDesc && Boolean(formik.errors.itemDesc)}
        helperText={formik.touched.itemDesc && formik.errors.itemDesc}
      />
      <TextField
        fullWidth
        id="itemPrice"
        label="Price"
        value={formik.values.itemPrice}
        onChange={formik.handleChange}
        error={formik.touched.itemPrice && Boolean(formik.errors.itemPrice)}
        helperText={formik.touched.itemPrice && formik.errors.itemPrice}
      />
      <Button color="primary" variant="contained" fullWidth type="submit">
        Add new item
      </Button>
    </form>
  );
}
