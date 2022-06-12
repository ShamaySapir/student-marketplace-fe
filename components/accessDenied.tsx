/* eslint-disable react/no-unescaped-entities */
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  ButtonGroup,
  Stack,
} from "@mui/material";
import { signIn, useSession } from "next-auth/client";
import CrewAvatar from "./crewAvatar";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import Divider from "@mui/material/Divider";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#224870",
  backgroundColor: "white",
  borderRadius: "30px",
  "&:hover": {
    backgroundColor: "white",
    color: "#44CFCB",
    border: "2px solid",
    borderColor: "white",
  },
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  color:"#224870",
  fontFamily:"Lato"
}));

const StyledSubject = styled(Typography)(({ theme }) => ({
  textAlign:"center",
  color:"#224870",
  fontFamily:"Lato"
}));

const StyledFooterText = styled(Typography)(({ theme }) => ({
  component:"div",
  fontFamily:"Lato"
}));

export default function AccessDenied() {
  const AVATAR_SIZE = 180;
  return (
    <Grid container direction="row">

  <Grid container spacing={2}>
  <Grid item xs={6} mt={10} ml={20}>
    <StyledTitle   variant="h2">
        <strong> Student Social </strong>  
    </StyledTitle>
    <StyledTitle variant="h2">
        <strong> Marketplace </strong> 
    </StyledTitle>
  </Grid>
  <Grid item xs={4} mt={15}>
            <Image
              src={"/images/coin.png"}
              alt={"logo"}
              width={"200px"}
              height={"180px"}
            ></Image>
  </Grid>
  <Grid item xs={3}>
    <ColorButton size="large" sx={{ml: 25}} style={{fontFamily:"Lato"}} 
      onClick={() => signIn("google")}
    >Join us</ColorButton>
  </Grid>
  <Grid item xs={4}>
    <ColorButton size="large" href="#CardInfo" style={{fontFamily:"Lato"}}>About us</ColorButton>
  </Grid>
    </Grid>

    <Grid
          flex={"auto"}
          paddingTop={10}
          id="CardInfo"
          // alignItems="center"
          // justifyContent="center"
      >
          <Divider variant="middle"/>
          <br />
          <StyledSubject variant="h3">
            <strong>About Us</strong>
          </StyledSubject>
          <br />
          <Divider variant="middle"/>
      </Grid>
        {/* <Grid container direction="column">
          <Grid item container justifyContent="center">
          <Grid item lg={12}>
              <Typography variant="h2" color={"#224870"}>
                <strong> Student Social Marketplace </strong>
              </Typography>
            </Grid> 
           <Grid lg={6}>
              <ColorButton size="large">Join us</ColorButton>
            </Grid>
            <Grid lg={6}>
              <ColorButton size="large" href="#CardInfo">
                About us
              </ColorButton>
            </Grid>
        </Grid>
        {/* <Grid item>
            <Image
              src={"/images/ether.png"}
              alt={"logo"}
              width={"350px"}
              height={"100px"}
            ></Image>
        </Grid> */}
      {/* </Grid> */}


      {/* <Grid
          flex={"auto"}
          paddingTop={10}
          // alignItems="center"
          // justifyContent="center"
      >
          <Divider variant="fullWidth" />
          <br />
          <Typography variant="h3" textAlign={"center"} color={"#224870"}>
            <strong>Student Social Marketplace</strong>
          </Typography>
          <br />
          <Divider variant="fullWidth" />
      </Grid> */}

      <Grid container item columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={3} style={{ flexBasis: "15%" }}></Grid>
        <Grid container direction={"row"} m={5} item xs spacing={5}>
          <Grid item marginTop={"1px"}>
            <Card 
              variant="outlined"
              sx={{
                transition: "0.3s",
                boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                "&:hover": {
                  boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
                },
              }}
            >
              <CardContent>
                <StyledFooterText gutterBottom variant="h5">
                  The <strong>Student Social Marketplace</strong> is a
                  social-economic enterprise.
                </StyledFooterText>

                <StyledFooterText gutterBottom variant="h5">
                  It is the first of its kind in the country that brings an
                  exclusive trading ground designed exclusively for students,
                  who share common interests.
                </StyledFooterText>

                <StyledFooterText gutterBottom variant="h5">
                  This marketplace allows each user to advertise a wide range of
                  services that he is interested in offering at no cost to the
                  user.
                </StyledFooterText>

                <StyledFooterText gutterBottom variant="h5">
                  The entire payment system will be based on a unique
                  cryptographic currency that was developed for this project.
                </StyledFooterText>

                <StyledFooterText gutterBottom variant="h5">
                  This cryptocurrency includes a unique infrastructure that
                  allows the allocation of the profits from all the transactions
                  for the purpose of promoting and helping the project grow and
                  will return to the community through financial donations with
                  the project's coin.
                </StyledFooterText>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            flex={"auto"}
            paddingTop={10}
            alignItems="center"
            justifyContent="center"
          >
            <Divider variant="fullWidth" />
            <br />
            <StyledSubject variant="h3">
              <strong>Meet the team</strong>
            </StyledSubject>
            <br />
            <Divider variant="fullWidth" />
          </Grid>
          <Grid item container justifyContent="center" spacing={15}>
            {[
              {
                AVATAR_SIZE,
                imgSrc: "/images/lior.jpg",
                name: "Lior",
                fullName: "Lior Savchenko",
                description: "4th year student BGU",
              },
              {
                AVATAR_SIZE,
                imgSrc: "/images/Sapir.png",
                name: "Sapir",
                fullName: "Sapir Shamay",
                description: "4th year student BGU",
              },
              {
                AVATAR_SIZE,
                imgSrc: "/images/dor.png",
                name: "Dor",
                fullName: "Dor Shireto",
                description: "4th year student BGU",
              },
            ].map((props, id) => (
              <Grid item key={id}>
                <CrewAvatar {...props} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={3} style={{ flexBasis: "15%" }}></Grid>
      </Grid>
    </Grid>
  );
}
