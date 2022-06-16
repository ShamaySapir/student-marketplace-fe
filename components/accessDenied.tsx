/* eslint-disable react/no-unescaped-entities */
import { Typography, Grid, Card, CardContent } from "@mui/material";
import { signIn } from "next-auth/client";
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

export default function AccessDenied() {
  const AVATAR_SIZE = 180;
  return (
    <Grid container textAlign={"center"}>
      <Grid container spacing={2} paddingTop={10}>
        <Grid item xs>
          <Typography variant="h2" color={"#224870"} fontFamily="Lato">
            <strong> Student Social Marketplace</strong>
          </Typography>
        </Grid>
        <Grid container item alignItems="center">
          <Grid item xs>
            <ColorButton
              size="large"
              style={{ fontFamily: "Lato" }}
              onClick={() => signIn("google")}
            >
              Join us
            </ColorButton>
          </Grid>

          <Grid item xs>
            <Image
              src={"/images/coin.png"}
              alt={"logo"}
              width={"200px"}
              height={"180px"}
            />
          </Grid>
          <Grid item xs>
            <ColorButton
              size="large"
              href="#CardInfo"
              style={{ fontFamily: "Lato" }}
            >
              About us
            </ColorButton>
          </Grid>
        </Grid>
        {/* <Grid item xs={4}>
          <Image
            src={"/images/coin.png"}
            alt={"logo"}
            width={"200px"}
            height={"180px"}
          ></Image>
        </Grid> */}
      </Grid>

      <Grid flex={"auto"} paddingTop={10} id="CardInfo">
        <Divider variant="middle" />
        <br />
        <Typography
          variant="h3"
          textAlign={"center"}
          color={"#224870"}
          fontFamily="Lato"
        >
          <strong>About Us</strong>
        </Typography>
        <br />
        <Divider variant="middle" />
      </Grid>

      <Grid container item columns={{ xs: 4 }}>
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
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  fontFamily="Lato"
                >
                  The <strong>Student Social Marketplace</strong> is a
                  social-economic enterprise.
                </Typography>

                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  fontFamily="Lato"
                >
                  It is the first of its kind in the country that brings an
                  exclusive trading ground designed exclusively for students,
                  who share common interests.
                </Typography>

                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  fontFamily="Lato"
                >
                  This marketplace allows each user to advertise a wide range of
                  services that he is interested in offering at no cost to the
                  user.
                </Typography>

                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  fontFamily="Lato"
                >
                  The entire payment system will be based on a unique
                  cryptographic currency that was developed for this project.
                </Typography>

                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  fontFamily="Lato"
                >
                  This cryptocurrency includes a unique infrastructure that
                  allows the allocation of the profits from all the transactions
                  for the purpose of promoting and helping the project grow and
                  will return to the community through financial donations with
                  the project's coin.
                </Typography>
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
            <Typography
              variant="h3"
              textAlign={"center"}
              color={"#224870"}
              fontFamily="Lato"
            >
              <strong>Meet the team</strong>
            </Typography>
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
