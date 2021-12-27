import React, { useEffect, useState } from "react";
import { TextField, Button, IconButton, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import { useSession } from "next-auth/client";
import { Session } from "next-auth";
import * as yup from "yup";
import { PhotoCamera } from "@mui/icons-material";

const validationSchema = yup.object({
  displayName: yup
    .string()
    .min(2, "Too Short!")
    .max(25, "Too Long!")
    .matches(/^[a-z]+$/, "Should contain only letters!")
    .required("Required"),
  description: yup
    .string()
    .min(10, "Too Short!")
    .max(500, "Too Long!")
    .required("Required"),
});
interface IUserDetails {
  displayName: Session["displayName"];
  description: string;
}
const Input = styled("input")({
  display: "none",
});

export default function BecomeASellerForm() {
  const [session, loading] = useSession();
  const [user, setUser] = useState<Partial<IUserDetails>>({
    displayName: session?.user.displayName as string,
  });

  useEffect(() => {
    if (!loading && session!.user) {
      setUser({
        displayName: user.displayName,
      });
    }
  }, [session, loading]);
  const formik = useFormik({
    initialValues: {
      displayName: user.displayName,
      description: user.description,
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
        fullWidth
        id="displayName"
        name="displayName"
        label="Display Name"
        value={formik.values.displayName}
        onChange={formik.handleChange}
        error={formik.touched.displayName && Boolean(formik.errors.displayName)}
        helperText={formik.touched.displayName && formik.errors.displayName}
      />
      <TextField
        fullWidth
        id="description"
        name="description"
        label="Description"
        placeholder="Enter your seller description"
        defaultValue={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
      <Stack direction="row" alignItems="center" spacing={2}>
        <label htmlFor="icon-button-file">
          <Input accept="image/*" id="icon-button-file" type="file" />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
      </Stack>

      <Button color="primary" variant="contained" fullWidth type="submit">
        Become a seller
      </Button>
    </form>
  );
}
