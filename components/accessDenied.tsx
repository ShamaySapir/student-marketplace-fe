import { Typography, Grid, Card, CardContent, Avatar } from "@mui/material";
import CrewAvatar from "./crewAvatar";

export default function AccessDenied() {
  const AVATAR_SIZE = 180;
  return (
    <Grid container direction="column">
      <Grid
        container
        item
        columns={{ xs: 4, sm: 8, md: 12 }}
        style={{ marginTop: "10vh" }}
      >
        <Grid item xs={3}></Grid>
        <Grid container direction={"row"} item xs spacing={5}>
          <Grid item>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  The Student Social Marketplace is a social-economic
                  enterprise.
                </Typography>

                <Typography gutterBottom variant="h5" component="div">
                  It is the first of its kind in the country that brings an
                  exclusive trading ground designed exclusively for students,
                  who share common interests.
                </Typography>

                <Typography gutterBottom variant="h5" component="div">
                  This marketplace allows each user to advertise a wide range of
                  services that he is interested in offering at no cost to the
                  user.
                </Typography>

                <Typography gutterBottom variant="h5" component="div">
                  The entire payment system will be based on a unique
                  cryptographic currency that was developed for this project.
                </Typography>

                <Typography gutterBottom variant="h5" component="div">
                  This cryptocurrency includes a unique infrastructure that
                  allows the allocation of the profits from all the transactions
                  for the purpose of promoting and helping the project grow and
                  will return to the community through financial donations with
                  the project's coin.
                </Typography>
              </CardContent>
            </Card>
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
        <Grid item xs={3}></Grid>
      </Grid>
    </Grid>
  );
}
