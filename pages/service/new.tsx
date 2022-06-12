import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button, { ButtonProps } from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from "@mui/styles";

import {
  TextField,
  MenuItem,
  CircularProgress,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  Box,
  Grid,
  Breadcrumbs,
  Link,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import * as routes from "../../tools/api/routes";
import * as yup from "yup";
import { map } from "lodash";
import { ItemType } from "../../types/types";
import { Home, PhotoCamera } from "@mui/icons-material";
import { useSession } from "next-auth/client";

// Dor
import * as filestack from 'filestack-js';
let imgurl = '';



const validationSchema = yup.object({
  itemTypeId: yup.string().required("Required"),
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

const Input = styled("input")({
  // display: "none",
});

// const uploadImage = async (
//   setLoading: React.Dispatch<React.SetStateAction<boolean>>,
//   setImageId: any
// ) => {
//   setLoading(true);
//   // const res = await routes.postUploadImage(e.currentTarget.files!);
//   // setImageId({ target: { value: res.data[0].id } });
//   setImageId({ target: { value: res.data } });
//   setLoading(false);
// };

export default function AddServiceForm() {

  const imageClient = filestack.init('AIJohRwxTRSzHwGr49Tkqz');
  const options = {
    maxFiles: 1,
    uploadInBackground: false,
    onOpen: () => console.log('opened!'),
    onUploadDone: (res: any) => {
      imgurl = res.filesUploaded[0].url
    },
  };
  // Dor


  const [session, loading] = useSession();
  const [getLoading, setLoading] = useState<boolean>(false);
  const [itemTypes, setItemTypes] = useState<ItemType[]>([]);
  const [getSuccessfulMessage, setSuccessfulMessage] = useState<boolean>(false);
  const router = useRouter();
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
      itemTypeId: itemTypes?.[0]?.id,
      itemName: "",
      itemDesc: "",
      itemPrice: "",
      imageId: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const payload = {
        title: values.itemName,
        serviceGroup: values.itemTypeId,
        description: values.itemDesc,
        image: imgurl,
        price: values.itemPrice,
        sellerId: session!.user.googleId,
      };
      const response = await routes.addService(payload);
      if (response.status === 200) {
        console.log(imgurl);
        imgurl = '';
        setSuccessfulMessage(true);
        if (response.data.itemId) {
          router.push(`/service/${response.data.itemId}`);
        }
      }
    },
  });
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color:"white",
    backgroundColor: "#224870",
    borderRadius:'4',
    '&:hover': {
      backgroundColor: "#224870",
      color:"#44CFCB",
      border: '2px solid',
      borderColor:"white"
    },
    fontFamily:"Lato"
  }));

  const StyledPageTitle = styled(Typography)(({ theme })=>({
    textAlign:"center",
    sx:{ 
      mt: 4, 
    },
    fontFamily:"Lato",
    color: "#224870"

  }));

  const StyledLink = styled(Link)(({ theme })=>({
    underline:"hover",
    sx:{
        display: "flex",
        alignItems: "center",
        ":hover": 
          { color: "#205375" },
    },
    color:"inherit",
    fontSize:"20px",
    fontFamily:"Lato"
  }));

  const StyledDialogText = styled(Typography)(({ theme })=>({
    component:"h2",
    fontFamily:"Lato"
  }));

  const useStyles = makeStyles(() => ({
    textField: {
      fontFamily: "Lato",
    },
    input: {
      fontFamily: "Lato",
    }
  }));
  
  const classes = useStyles();

  return (
    <>
    <Box sx={{ml:20,mr:20,mt:5,mb:10}}>
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
          <StyledLink
            href="/"
          >
            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </StyledLink>
          <StyledLink
            href="/service/new"
          >
            <AddIcon sx={{ mr: 0.5 }} fontSize="inherit"/>
            Add new item
          </StyledLink>
        </Breadcrumbs>
      </Grid>

      <Divider />
      <StyledPageTitle
        variant="h4">
        <strong>Add new item</strong>
      </StyledPageTitle>
      <form onSubmit={formik.handleSubmit}>
      <Stack direction="column" spacing={2} >
        <TextField
          className={classes.textField}
          id="itemTypeId"
          select
          label="Type"
          value={formik.values.itemTypeId}
          onChange={formik.handleChange("itemTypeId")}
          error={formik.touched.itemTypeId && Boolean(formik.errors.itemTypeId)}
          margin="normal"
          fullWidth
          InputLabelProps={{
            className: classes.textField
          }}
          inputProps={{
            className: classes.input,
          }}
          SelectProps={{
            className: classes.input,
          }}
        >
          {map(itemTypes, ({ id, name }) => (
            <MenuItem value={id} key={id} style={{fontFamily:"Lato"}}>
              {name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          className={classes.textField}
          fullWidth
          id="itemName"
          label="Name"
          value={formik.values.itemName}
          onChange={formik.handleChange}
          error={formik.touched.itemName && Boolean(formik.errors.itemName)}
          helperText={formik.touched.itemName && formik.errors.itemName}
          InputLabelProps={{
            className: classes.textField
          }}
          inputProps={{
            className: classes.input,
          }}
        />
        <TextField
          className={classes.textField}
          fullWidth
          multiline
          id="itemDesc"
          label="Description"
          value={formik.values.itemDesc}
          onChange={formik.handleChange}
          error={formik.touched.itemDesc && Boolean(formik.errors.itemDesc)}
          helperText={formik.touched.itemDesc && formik.errors.itemDesc}
          InputLabelProps={{
            className: classes.textField
          }}
          inputProps={{
            className: classes.input,
          }}
        />
        <TextField
          className={classes.textField}
          fullWidth
          id="itemPrice"
          label="Price"
          value={formik.values.itemPrice}
          onChange={formik.handleChange}
          error={formik.touched.itemPrice && Boolean(formik.errors.itemPrice)}
          helperText={formik.touched.itemPrice && formik.errors.itemPrice}
          InputLabelProps={{
            className: classes.textField
          }}
          inputProps={{
            className: classes.input,
          }}
        />
        <Button
          style={{fontFamily:"Lato"}}
          onClick={() => {imageClient.picker(options).open()}}>
          Add image
        </Button>
        {/* <Stack direction="row" alignItems="center" spacing={2}>
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
        </Stack> */}

        <ColorButton variant="contained" fullWidth type="submit" endIcon={<AddIcon/>}>
          <strong>Add </strong>
        </ColorButton>
        </Stack>
      </form>
      <Dialog
        open={getSuccessfulMessage}
        onClose={() => setSuccessfulMessage(false)}
        disableEscapeKeyDown={false}
      >
        <DialogTitle>
          <StyledDialogText variant="h6">
            Congratulations!
          </StyledDialogText>
        </DialogTitle>
        <DialogContent>
          <StyledDialogText sx={{ mt: 2 }}>
            Your item was added successfuly
          </StyledDialogText>
        </DialogContent>
      </Dialog>
    </Box>
    </>
  );
}
