import React, { useEffect, useState } from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  Stack,
  Box,
  Divider,
  Breadcrumbs,
  Link,
  Grid,
  Avatar
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { useFormik } from "formik";
import { useSession } from "next-auth/client";
import * as routes from "../tools/api/routes";
import * as yup from "yup";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { Image } from "@mui/icons-material";

const validationSchema = yup.object({
  firstName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  displayName: yup
    .string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  walletNumber: yup
    .string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
type stringOrUndefinendOrNull = string | undefined | null;
interface IUserDetails {
  email: stringOrUndefinendOrNull;
  firstName: stringOrUndefinendOrNull;
  lastName: stringOrUndefinendOrNull;
  displayName: stringOrUndefinendOrNull;
  walletNumber: stringOrUndefinendOrNull;
}

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

export default function RegistrationForm() {
  const [session, loading] = useSession();
  const [getSuccessfulMessage, setSuccessfulMessage] = useState<boolean>(false);
  const [user, setUser] = useState<IUserDetails>({
    email: "",
    firstName: "",
    lastName: "",
    displayName: "",
    walletNumber: "",
  });

  useEffect(() => {
    if (!loading && session!.user) {
      const loggedInUser = session!.user;
      setUser({
        email: loggedInUser.email,
        firstName: session!.user.firstName as string,
        lastName: session!.user.lastName as string,
        displayName: session!.user.name as string,
        walletNumber: session!.user.walletNumber as string,
      });
    }
  }, [session, loading]);
  const formik = useFormik({
    initialValues: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName,
      walletNumber: user.walletNumber,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const payload = {
        firstName: session!.user.firstName,
        lastName: session!.user.lastName,
        displayName: values.displayName,
        email: session!.user.email,
        isSeller: false,
        googleId: session!.user.googleId,
      };
      const response = await routes.updateUser(payload);
      setSuccessfulMessage(response.status === 200);
    },
  });

  return (
    <>
      <Box sx={{ ml:20 ,mr:20, mt:5,mb:10 }}>
        <Grid className="breadCrumbs"
          mt={2}
          mb={2}
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link 
              underline="hover"
              sx={{ display: "flex", alignItems: "center",":hover":{color:"#205375"} }}
              color="inherit"
              href="/"
              fontSize={"20px"}

            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center",":hover":{color:"#205375"} }}
              color="inherit"
              href="/profile"
              fontSize={"20px"}
            >
              <PersonIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Profile
            </Link>
          </Breadcrumbs>
        </Grid>

        <Divider />
        <Stack alignItems={"center"} spacing={1}>
        <Typography
          variant="h4"
          textAlign={"center"}
          sx={{ mt: 4, color: "#224870" }}
        >
          <strong>User profile</strong>
        </Typography>

        </Stack>
        
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="column" mt={4} spacing={2}>
            <TextField
              id="email"
              name="email"
              label="Email"
              disabled
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              id="firstName"
              name="firstName"
              label="First Name"
              disabled
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              id="lastName"
              name="lastName"
              label="Last Name"
              disabled
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              id="displayName"
              name="displayName"
              label="Display Name"
              value={formik.values.displayName}
              onChange={formik.handleChange}
              error={
                formik.touched.displayName && Boolean(formik.errors.displayName)
              }
              helperText={
                formik.touched.displayName && formik.errors.displayName
              }
            />
            <TextField
              id="walletNumber"
              name="walletNumber"
              label="Wallet number"
              value={formik.values.walletNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.walletNumber &&
                Boolean(formik.errors.walletNumber)
              }
              helperText={
                formik.touched.walletNumber && formik.errors.walletNumber
              }
            />
            <ColorButton
              variant="contained"
              type="submit"
              endIcon={<SendIcon />}
            >
              <strong>Submit</strong>
            </ColorButton>
          </Stack>
        </form>
      </Box>

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
            Your display name was changed successfuly
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}
