import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InfoIcon from "@mui/icons-material/Info";
import {
  Grid,
  Button,
  Paper,
  Card,
  CardMedia,
  Typography,
  IconButton,
  Rating,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import * as routes from "../../tools/api/routes";
import { Service } from "../../types/types";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ItemPage() {
  const [session, loading] = useSession();

  const [getItemDesc, setItemDesc] = useState<Service>({
    id: "",
    image: "",
    price: 0,
    rating: 0,
    serviceGroup: "",
    title: "",
    description: "",
    sellerDesc: "",
    sellerPhone: "",
  });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function getItemDescription() {
      const itemDescription = await routes.getService({
        itemId: id as string,
      });
      setItemDesc(itemDescription);
    }
    getItemDescription();
  }, [id]);
  const purchase = async () => {
    routes.postPurchase({
      buyerId: session?.user.googleId as string,
      itemId: id as string,
      quantity: 1,
    });
  };
  return (
    <>
      <Grid container>
        <Grid container item direction={"column"} xs>
          <Grid item>
            <Typography variant="h2">{getItemDesc.title}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4">{getItemDesc.description}</Typography>
          </Grid>
          <Grid container item justifyContent="flex-end" alignItems="center">
            <Grid item>
              <Typography variant="h5">{getItemDesc.price}</Typography>
            </Grid>
            <Grid item>
              <AttachMoneyIcon />
            </Grid>
          </Grid>
          <Grid item>
            <Rating defaultValue={getItemDesc.rating} />
          </Grid>
        </Grid>
        <Grid item xs>
          <Card>
            <CardMedia
              component="img"
              height="600"
              image={getItemDesc.image}
              alt={getItemDesc.title}
            />
          </Card>
        </Grid>
      </Grid>
      <Grid container>
        <Grid container direction={"column"}>
          <Grid item>
            <Typography variant="h5">About the seller</Typography>
          </Grid>
          <Grid container item alignItems={"center"}>
            <IconButton aria-label="add to favorites">
              <InfoIcon />
            </IconButton>
            <Typography>{getItemDesc.sellerDesc}</Typography>
          </Grid>
          <Grid container item alignItems={"center"}>
            <IconButton aria-label="add to favorites">
              <LocalPhoneIcon />
            </IconButton>
            <Typography>{getItemDesc.sellerPhone}</Typography>
          </Grid>
          <Grid container item alignItems={"center"}>
            <Button variant="contained" onClick={purchase}>
              Purchase
            </Button>
          </Grid>
        </Grid>
        <Grid></Grid>
      </Grid>
    </>
    // <>
    //   <Box sx={{ flexGrow: 1 }}>
    //     <Grid container spacing={2}>
    //       <Grid item xs={12}>
    //         <Item>{getItemDesc.title}</Item>
    //       </Grid>
    //       <Grid item xs={8}>
    //         <Item>{getItemDesc.description}</Item>
    //       </Grid>
    //       <Grid item xs={4}>
    //         <Item>{getItemDesc.rating}</Item>
    //       </Grid>
    //       <Grid item xs={8}>
    //         <Item>{getItemDesc.sellerDesc}</Item>
    //       </Grid>
    //       <Grid item xs={4}>
    //         <Item>{getItemDesc.price}</Item>
    //       </Grid>
    //       <Grid item xs={8}>
    //         <Item>
    //           <Card sx={{ maxWidth: 345 }}>
    //             <CardMedia
    //               component="img"
    //               height="140"
    //               image={getItemDesc.image}
    //               alt={getItemDesc.title}
    //             />
    //           </Card>
    //         </Item>
    //       </Grid>
    //       <Grid item xs={4}>
    //         <Item>{getItemDesc.sellerPhone}</Item>
    //       </Grid>
    //     </Grid>
    //   </Box>
    // </>
  );
}
