// @ts-nocheck
import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Rating,
  Stack,
} from "@mui/material";
import Link from "next/link";
import { DescriptionItem } from "../types/types";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";

const useStyles = makeStyles({
  // link: {
  //   cursor: "pointer",
  // },
});

const StyledCardMedia = styled(CardMedia)(({ theme })=>({
  p:3,
  width:"240px",
  height:"200px"
}));

const StyledCardContentTitle = styled(Typography)(({ theme })=>({
  variant:"h5",
  fontFamily:"Lato"
}));

export default function ServiceTile({
  image,
  title,
  id,
  price,
  rating,
}: DescriptionItem) {
  const classes = useStyles();

  return (
    <Link href={`/service/${id}`} passHref key={id}>
      <Card>
        <StyledCardMedia
          component="img"
          image={
            image.startsWith("http")
              ? image
              : `${process.env.NEXT_PUBLIC_MARKETPLACE_API}/${image}`
          }
          alt={title}
        />
        <CardContent>
          <StyledCardContentTitle
            gutterBottom
            component="div"
          >
            {title}
          </StyledCardContentTitle>
        </CardContent>
        <CardActions>
          <Grid
            container
            item
            // alignItems={"center"}
            display="flex"
            justifyContent={"space-between"}
          >
            <Grid>
              <Rating defaultValue={rating} disabled />
            </Grid>
            <Grid item display="inline-block">
              {price} S2S
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Link>
  );
}
