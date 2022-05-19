import React from "react";
import Image from "next/image";
import { Grid, Avatar, Typography } from "@mui/material";

const CrewAvatar = ({
  AVATAR_SIZE,
  imgSrc,
  name,
  fullName,
  description,
}: any) => {
  return (
    <Grid container direction="column">
      <Grid item>
        <Avatar alt={name} sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}>
          <Image
            src={imgSrc}
            alt={name}
            width={AVATAR_SIZE}
            height={AVATAR_SIZE}
          />
        </Avatar>
        <Grid item style={{ textAlign: "center" }}>
          <Typography variant="h5">{fullName}</Typography>
          <Typography variant="h6">{description}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default CrewAvatar;
