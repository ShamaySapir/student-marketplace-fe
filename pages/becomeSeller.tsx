import React, { useEffect, useState } from "react";
import { TextField, Button, TextareaAutosize } from "@mui/material";
import { useFormik } from "formik";
import { useSession } from "next-auth/client";
import { Session } from "next-auth";
import * as yup from "yup";

const validationSchema = yup.object({
  displayName: yup
    .string()
    .min(2, "Too Short!")
    .max(25, "Too Long!")
    .required("Required"),
  // description: yup
  //   .string()
  //   .min(2, "Too Short!")
  //   .max(500, "Too Long!")
  //   .required("Required"),
});
interface IUserDetails {
  displayName: Session["displayName"];
}

export default function BecomeASellerForm() {
  const [session, loading] = useSession();
  const [user, setUser] = useState<IUserDetails>({
    displayName: session?.user.displayName as string,
    // description:
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
      {/* <TextareaAutosize
          id="description"
          name="description"
          placeholder="Description"
          defaultValue={formik.values.description}
          error={
            formik.touched.displayName && Boolean(formik.errors.displayName)
          }
          helperText={formik.touched.displayName && formik.errors.displayName}
        /> */}
      <Button color="primary" variant="contained" fullWidth type="submit">
        Become a seller
      </Button>
    </form>
  );
}
