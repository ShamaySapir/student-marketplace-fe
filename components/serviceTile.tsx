// @ts-nocheck
import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Grid,
  Rating,
  Stack,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
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
    <Link href={`/service/${id}`} key={id} passHref>
      <Card>
        <CardMedia component="img" height="140" image={image} alt={title} />
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
            {/* <Grid item>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
            </Grid> */}
            <Grid item>
              <Stack>
                <Rating defaultValue={rating} />
              </Stack>
            </Grid>
            <Grid item>Price: {price}</Grid>
          </Grid>
        </CardActions>
      </Card>
    </Link>
  );
}
