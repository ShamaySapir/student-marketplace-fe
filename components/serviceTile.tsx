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
} from "@mui/material";
import Link from "next/link";
import { DescriptionItem } from "../types/types";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  // link: {
  //   cursor: "pointer",
  // },
});

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
      <Card style={{ margin: "10px" }}>
        <CardMedia
          p={3}
          component="img"
          width={"240px"}
          height={"200px"}
          image={
            image.startsWith("http")
              ? image
              : `${process.env.NEXT_PUBLIC_MARKETPLACE_API}/${image}`
          }
          onError={(e) =>
            (e.target.src = "/_next/image?url=%2Fimages%2Fcoin.png&w=96&q=75")
          }
          alt={title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            fontFamily="Lato"
          >
            {title}
          </Typography>
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
