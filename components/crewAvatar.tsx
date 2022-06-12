import React from "react";
import Image from "next/image";
import { Grid, Avatar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";


const StyledAvaterName = styled(Typography)(({ theme })=>({
  fontFamily:"Lato",
  variant:"h5"
}));

const StyledAvaterDescription = styled(Typography)(({ theme })=>({
  fontFamily:"Lato",
  variant:"h6"
}));

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
        {fullName && (
          <Grid item style={{ textAlign: "center" }}>
            <StyledAvaterName >{fullName}</StyledAvaterName>
            <StyledAvaterDescription >{description}</StyledAvaterDescription>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
export default CrewAvatar;
