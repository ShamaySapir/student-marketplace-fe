import GoogleLoginIcon from "./gLoginIcon.svg";
import { Box } from "@mui/material";

import styles from "./googleProviderSignin.module.css";

interface IProps {}

export default function GoogleProviderSignin(props: IProps) {
  return (
    <Box sx={{ gridArea: "loginIcon" }} className={styles.logo} {...props}>
      <GoogleLoginIcon />
    </Box>
  );
}
