import { styled } from "@mui/material/styles";
import { Link } from "@mui/material";
import { Divider } from "@mui/material";
import { Grid } from "@mui/material";

const MyFooter = styled("footer")({
  color: "white",
  backgroundColor: "#224870",
  padding: 8,
  borderRadius: 4,
  alignItems: "center",
  textAlign: "center",
});

export default function Footer() {
  return (
    <MyFooter>
      <h4>Software and Information System Engineering</h4>
      <br />
      <Divider />
      <br />
      <h6>
        Advisior : Mr. Zevin Ofer , Head of FinTech Research and Development at
        exLab academic in Ben Gurion University
      </h6>
      <h6> zevin@post.bgu.ac.il </h6>
      <br />
      <Divider />
      <br />

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Link
            href="https://www.linkedin.com/in/lior-savchenko-6692101a8/"
            color="#FFFFFF"
            target={"_blank"}
          >
            Lior Savchenko
          </Link>
          <h6> LIORSAV@post.bgu.ac.il </h6>
        </Grid>
        <Grid item xs={4}>
          <Link
            target={"_blank"}
            href="https://www.linkedin.com/in/sapir-shamay/"
            color="#FFFFFF"
          >
            Sapir Shamay
          </Link>
          <h6> sapirnag@post.bgu.ac.il </h6>
        </Grid>
        <Grid item xs={4}>
          <Link
            href="https://www.linkedin.com/in/dorshireto/"
            color="#FFFFFF"
            target={"_blank"}
          >
            Dor Shireto
          </Link>
          <h6>shiretod@post.bgu.ac.il </h6>
        </Grid>
      </Grid>
    </MyFooter>
  );
}
