import { styled } from "@mui/material/styles";
import {
  Grid,
  IconButton,
  Divider,
  Link,
  Avatar,
  Typography,
} from "@mui/material";
import {
  Email as EmailIcon,
  LinkedIn as LinkedInIcon,
} from "@mui/icons-material";
import Image from "next/image";

const MyFooter = styled("footer")({
  color: "white",
  backgroundColor: "#224870",
  // marginTop: "-91px",
  textAlign: "center",
});
const MailWithIcon = ({ emailAddress }) => (
  <IconButton>
    <Link target={"_blank"} href={`mailto:${emailAddress}`} color="#FFFFFF">
      <EmailIcon />
    </Link>
  </IconButton>
);
const CrewFooterInfo = ({ liHref, name, image, emailAddress }) => (
  <Grid item container xs justifyContent="center">
    <IconButton>
      <Link target={"_blank"} href={liHref} color="#FFFFFF">
        <LinkedInIcon />
      </Link>
    </IconButton>
    <Avatar alt={name}>
      <Image src={image} alt={name} width={30} height={30} />
    </Avatar>
    <MailWithIcon emailAddress={emailAddress} />
  </Grid>
);
const crewInfo = [
  {
    name: "Sapir Shamay",
    liHref: "https://www.linkedin.com/in/sapir-shamay/",
    image: "/images/Sapir.png",
    emailAddress: "sapirnag@post.bgu.ac.il",
  },
  {
    name: "Lior Savchenko",
    liHref: "https://www.linkedin.com/in/lior-savchenko-6692101a8/",
    image: "/images/lior.jpg",
    emailAddress: "LIORSAV@post.bgu.ac.il",
  },
  {
    name: "Dor Shireto",
    liHref: "https://www.linkedin.com/in/dorshireto/",
    image: "/images/dor.png",
    emailAddress: "shiretod@post.bgu.ac.il",
  },
];
export default function Footer() {
  return (
    <MyFooter>
      <Typography>Software and Information System Engineering</Typography>
      <Divider />
      <Grid
        container
        alignItems="center"
        justifyItems="center"
        justifyContent="center"
      >
        <Typography>Advisior : Mr. Zevin Ofer</Typography>
        <MailWithIcon emailAddress="zevin@post.bgu.ac.il" />
      </Grid>
      <Typography>
        Head of FinTech Research and Development at exLab academic in Ben Gurion
        University
      </Typography>
      <Divider sx={{ paddingTop: "4vh" }} />
      <Grid item container alignItems="center">
        {crewInfo.map((props, id) => (
          <CrewFooterInfo {...props} key={id} />
        ))}
      </Grid>
    </MyFooter>
  );
}
