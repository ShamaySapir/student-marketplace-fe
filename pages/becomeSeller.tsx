import React, { useEffect, useState } from "react";
import {
  TextField,
  Stack,
  Dialog,
  Typography,
  DialogContent,
  DialogActions,
  Box,
  Divider,
  Grid,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import { useSession, getSession } from "next-auth/client";
import { Session } from "next-auth";
import * as yup from "yup";
import { Home } from "@mui/icons-material";
import * as routes from "../tools/api/routes";
import { UserType } from "../constants";
import SellIcon from "@mui/icons-material/Sell";
import Button, { ButtonProps } from "@mui/material/Button";
import StorefrontIcon from "@mui/icons-material/Storefront";
import BootstrapDialogTitle from "../components/dialogTitle";
import * as validations from "../tools/validations";
import NextLink from "next/link";
const validationSchema = yup.object({
  ...validations.DISPLAY_NAME_VALIDATION,
  ...validations.SELLER_DESC_VALIDATION,
  ...validations.WALLET_NUMBER_VALIDATION,
  ...validations.PHONE_NUMBER_VALIDATION,
});
interface IUserDetails {
  displayName: Session["displayName"];
  sellerDesc: string;
}
const Input = styled("input")({
  // display: "none",
});

// const uploadImage = async (
//   e: React.ChangeEvent<HTMLInputElement>,
//   setLoading: React.Dispatch<React.SetStateAction<boolean>>,
//   setImageId: any
// ) => {
//   setLoading(true);
//   const res = await routes.postUploadImage(e.currentTarget.files!);
//   setImageId({ target: { value: res.data[0].id } });
//   setLoading(false);
// };

export default function BecomeASellerForm() {
  const [session, loading] = useSession();
  const [getLoading, setLoading] = useState<boolean>(false);
  const [getSuccessfulMessage, setSuccessfulMessage] = useState<boolean>(false);
  const [user, setUser] = useState<Partial<IUserDetails>>({
    displayName: "",
  });

  useEffect(() => {
    const getUpdatedSession = async () => {
      const updatedSession = await getSession();
      if (!loading && updatedSession!.user) {
        setUser({
          displayName: updatedSession?.user?.displayName as string,
        });
      }
    };
    getUpdatedSession();
  });

  const formik = useFormik({
    initialValues: {
      displayName: user.displayName,
      sellerDesc: "", //user.description,
      // imageId: "",
      phone: "",
      walletNumber: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const payload = {
        firstName: session!.user.firstName,
        lastName: session!.user.lastName,
        displayName: values.displayName,
        phoneNumber: values.phone,
        email: session!.user.email,
        isSeller: true,
        description: values.sellerDesc,
        walletNumber: values.walletNumber,
        // profilePic: values.imageId,
        googleId: session!.user.googleId,
      };
      const response = await routes.updateUser(payload);
      await getSession({ event: "storage" });
      setSuccessfulMessage(response.status === 200);
      session!.user.type = UserType.seller;
    },
  });

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: "white",
    backgroundColor: "#224870",
    borderRadius: "4",
    "&:hover": {
      backgroundColor: "#224870",
      color: "#44CFCB",
      border: "2px solid",
      borderColor: "white",
    },
  }));

  return (
    <>
      <Box sx={{ ml: 20, mr: 20, mt: 5, mb: 10 }}>
        <Grid
          className="breadCrumbs"
          mt={2}
          mb={2}
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Breadcrumbs aria-label="breadcrumb">
            <NextLink href="/">
              <Link
                underline="hover"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  ":hover": { color: "#205375" },
                }}
                color="inherit"
                href="/"
                fontSize={"20px"}
              >
                <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                Home
              </Link>
            </NextLink>
            <div>
              <StorefrontIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Become a seller
            </div>
          </Breadcrumbs>
        </Grid>

        <Divider />
        <Typography
          variant="h4"
          textAlign={"center"}
          sx={{ mt: 4, color: "#224870" }}
          fontFamily="Lato"
        >
          <strong>Become a seller</strong>
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="column" spacing={2}>
            <TextField
              fullWidth
              id="displayName"
              name="displayName"
              value={formik.values.displayName}
              onChange={formik.handleChange}
              error={
                formik.touched.displayName && Boolean(formik.errors.displayName)
              }
              helperText={
                formik.touched.displayName && formik.errors.displayName
              }
              inputProps={{
                style: {
                  fontFamily: "Lato",
                },
              }}
            />
            <TextField
              fullWidth
              id="sellerDesc"
              name="sellerDesc"
              label="Description"
              placeholder="Enter your seller description"
              defaultValue={formik.values.sellerDesc}
              onChange={formik.handleChange}
              error={
                formik.touched.sellerDesc && Boolean(formik.errors.sellerDesc)
              }
              helperText={formik.touched.sellerDesc && formik.errors.sellerDesc}
              inputProps={{
                style: {
                  fontFamily: "Lato",
                },
              }}
              InputLabelProps={{
                style: {
                  fontFamily: "Lato",
                },
              }}
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
              inputProps={{
                style: {
                  fontFamily: "Lato",
                },
              }}
              InputLabelProps={{
                style: {
                  fontFamily: "Lato",
                },
              }}
            />
            <TextField
              fullWidth
              id="walletNumber"
              name="walletNumber"
              label="Wallet number"
              placeholder="Wallet number"
              value={formik.values.walletNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.walletNumber &&
                Boolean(formik.errors.walletNumber)
              }
              helperText={
                formik.touched.walletNumber && formik.errors.walletNumber
              }
              inputProps={{
                style: {
                  fontFamily: "Lato",
                },
              }}
              InputLabelProps={{
                style: {
                  fontFamily: "Lato",
                },
              }}
            />
            {/* <Stack direction="row" alignItems="center" spacing={2} style={{fontFamily:"Lato"}}>
          <label style={{fontFamily:"Lato"}} htmlFor="icon-button-file">
            <Input
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={(e) =>
                uploadImage(e, setLoading, formik.handleChange("imageId"))
              }
              style={{fontFamily:"Lato"}}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              style={{fontFamily:"Lato"}}
            >
              {getLoading ? <CircularProgress /> : <PhotoCamera />}
            </IconButton>
          </label>
        </Stack> */}

            <ColorButton
              disabled={getLoading}
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              style={{ fontFamily: "Lato" }}
              endIcon={<SellIcon />}
            >
              <strong>Become a seller</strong>
            </ColorButton>
          </Stack>
        </form>
      </Box>

      <Dialog
        open={getSuccessfulMessage}
        onClose={() => setSuccessfulMessage(false)}
        disableEscapeKeyDown={false}
      >
        <BootstrapDialogTitle onClose={() => setSuccessfulMessage(false)}>
          Congratulations!
        </BootstrapDialogTitle>
        <DialogContent>
          <Typography fontFamily="Lato" sx={{ mt: 2 }}>
            You are now a seller.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Grid container justifyContent="center">
            <NextLink href="/service/new">
              <Button style={{ fontFamily: "Lato" }} variant="outlined">
                Add your first service/product
              </Button>
            </NextLink>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}
