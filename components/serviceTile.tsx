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
import { Link } from "@mui/material";
import { DescriptionItem } from "../types/types";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  link: {
    cursor: "pointer",
  },
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
    <Link href={`/service/${id}`} key={id}>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={
            image.startsWith("http")
              ? image
              : `${process.env.NEXT_PUBLIC_MARKETPLACE_API}/${image}`
          }
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
        <CardActions>
          <Grid
            container
            item
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Grid item>
              <Stack>
                <Rating defaultValue={rating} readOnly />
              </Stack>
            </Grid>
            <Grid item>Price: {price}</Grid>
          </Grid>
        </CardActions>
      </Card>
    </Link>
  );
}
