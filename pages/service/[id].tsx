import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { Grid, Box, Paper, Typography } from "@mui/material";
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
    price: "",
    rating: "",
    serviceGroup: "",
    title: "",
    description: "",
    sellerDesc: "",
    sellerPhone: "",
  });
  const router = useRouter();

  useEffect(() => {
    async function getItemDescription() {
      const { id } = router.query;
      if (id) {
        const itemDescription = await routes.getService({
          itemId: id as string,
        });
        setItemDesc(itemDescription);
      }
    }
    getItemDescription();
  });

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>{getItemDesc.title}</Item>
          </Grid>
          <Grid item xs={8}>
            <Item>{getItemDesc.description}</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>{getItemDesc.rating}</Item>
          </Grid>
          <Grid item xs={8}>
            <Item>{getItemDesc.sellerDesc}</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>{getItemDesc.price}</Item>
          </Grid>
          <Grid item xs={8}>
            <Item>{getItemDesc.image}</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>{getItemDesc.sellerPhone}</Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
