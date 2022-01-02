import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Input,
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
} from "@mui/material";
import { useFormik } from "formik";
import * as routes from "../tools/api/routes";
import * as yup from "yup";
import { map, pick } from "lodash";
import { ItemType } from "../types/types";
import { PhotoCamera } from "@mui/icons-material";
import { useSession } from "next-auth/client";
import { Session } from "next-auth";

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
    .max(500, "Too Long!")
    .required("Required"),
  itemPrice: yup
    .number()
    // .min(0, "Too cheap")
    // .max(100, "Too expensive")
    .required("Required"),
});

const uploadImage = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setImageId: any
) => {
  setLoading(true);
  const res = await routes.postUploadImage(e.currentTarget.files!);
  setImageId({ target: { value: res.data[0].id } });
  setLoading(false);
};

export default function AddServiceForm() {
  const [session, loading] = useSession();
  const [getLoading, setLoading] = useState<boolean>(false);
  const [itemTypes, setItemTypes] = useState<ItemType[]>([]);
  const [getSuccessfulMessage, setSuccessfulMessage] = useState<boolean>(false);

  useEffect(() => {
    async function getItemTypes() {
      const resJson = await routes.getItemTypes();
      const items = map(resJson, ({ name, id }) => ({
        name,
        id,
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
      imageId: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const payload = {
        title: values.itemName,
        serviceGroup: values.itemType,
        description: values.itemDesc,
        images: values.imageId,
        price: values.itemPrice,
        sellerId: session!.user.googleId,
      };
      const response = await routes.addService(payload);
      setSuccessfulMessage(response.status === 200);
    },
  });

  return (
    <>
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
        <Stack direction="row" alignItems="center" spacing={2}>
          <label htmlFor="icon-button-file">
            <Input
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={(e) =>
                uploadImage(e, setLoading, formik.handleChange("imageId"))
              }
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              {getLoading ? <CircularProgress /> : <PhotoCamera />}
            </IconButton>
          </label>
        </Stack>

        <Button color="primary" variant="contained" fullWidth type="submit">
          Add new item
        </Button>
      </form>
      <Dialog
        open={getSuccessfulMessage}
        onClose={() => setSuccessfulMessage(false)}
        disableEscapeKeyDown={false}
      >
        <DialogTitle>
          <Typography variant="h6" component="h2">
            Congratulations!
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mt: 2 }}>
            Your item was added successfuly
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}
