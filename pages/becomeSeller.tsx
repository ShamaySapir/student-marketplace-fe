import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  Stack,
  CircularProgress,
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import { useSession } from "next-auth/client";
import { Session } from "next-auth";
import * as yup from "yup";
import { PhotoCamera } from "@mui/icons-material";
import * as routes from "../tools/api/routes";
import Link from "next/link";
import { UserType } from "../constants";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
};
const validationSchema = yup.object({
  displayName: yup
    .string()
    .min(2, "Too Short!")
    .max(25, "Too Long!")
    .matches(/^[A-Za-z ]+$/, "Should contain only letters!")
    .required("Required"),
  sellerDesc: yup
    .string()
    .min(10, "Too Short!")
    .max(500, "Too Long!")
    .required("Required"),
  phone: yup
    .string()
    .min(10, "Phone number is not valid")
    .max(10, "Phone number is not valid")
    .required("Required"),
});
interface IUserDetails {
  displayName: Session["displayName"];
  sellerDesc: string;
}
const Input = styled("input")({
  // display: "none",
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

export default function BecomeASellerForm() {
  const [session, loading] = useSession();
  const [getLoading, setLoading] = useState<boolean>(false);
  const [getSuccessfulMessage, setSuccessfulMessage] = useState<boolean>(false);
  const [user, setUser] = useState<Partial<IUserDetails>>({
    displayName: session?.user.displayName as string,
  });

  useEffect(() => {
    if (!loading && session?.user) {
      setUser({
        displayName: session.user.displayName,
      });
    }
  }, [session, loading]);
  const formik = useFormik({
    initialValues: {
      displayName: user.displayName,
      sellerDesc: "", //user.description,
      imageId: "",
      phone: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const payload = {
        firstName: session!.user.firstName,
        lastName: session!.user.lastName,
        displayName: values.displayName,
        phone: values.phone,
        email: session!.user.email,
        isSeller: true,
        sellerDescription: values.sellerDesc,
        images: values.imageId,
        googleId: session!.user.googleId,
      };
      const response = await routes.becomeASeller(payload);
      setSuccessfulMessage(response.status === 200);
      session!.user.type = UserType.seller;
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="displayName"
          name="displayName"
          label="Display Name"
          value={formik.values.displayName}
          onChange={formik.handleChange}
          error={
            formik.touched.displayName && Boolean(formik.errors.displayName)
          }
          helperText={formik.touched.displayName && formik.errors.displayName}
        />
        <TextField
          fullWidth
          id="sellerDesc"
          name="sellerDesc"
          label="Description"
          placeholder="Enter your seller description"
          defaultValue={formik.values.sellerDesc}
          onChange={formik.handleChange}
          error={formik.touched.sellerDesc && Boolean(formik.errors.sellerDesc)}
          helperText={formik.touched.sellerDesc && formik.errors.sellerDesc}
        />
        <TextField
          fullWidth
          id="phone"
          name="phone"
          label="Phone Number"
          placeholder="Enter your seller contact phone"
          defaultValue={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
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

        <Button
          disabled={getLoading}
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Become a seller
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
          <Typography sx={{ mt: 2 }}>You are now a seller</Typography>
        </DialogContent>
        <DialogActions>
          <Link href="/service" passHref>
            <Button>Add your first service/product </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
}
