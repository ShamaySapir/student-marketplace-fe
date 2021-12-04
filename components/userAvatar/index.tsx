import { useState } from "react";
import { signOut, useSession } from "next-auth/client";
import {
  Avatar,
  Button,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";
import Menu from "./Menu";
import Link from "next/link";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";

import { styled } from "@mui/material/styles";

const SignOutComponent = () => (
  <div>
    <Grid container>
      <Grid item>
        <ListItemIcon>
          <ExitToAppIcon fontSize="small" />
        </ListItemIcon>
      </Grid>
      <Grid item>
        <ListItemText>Logout</ListItemText>
      </Grid>
    </Grid>
  </div>
);

const MyProfileComponent = () => (
  <Link href="/registration" passHref>
    <Grid container>
      <Grid item>
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
      </Grid>
      <Grid item>
        <ListItemText>My Profile</ListItemText>
      </Grid>
    </Grid>
  </Link>
);
const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));
// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.

const MenuItems = [
  {
    Component: () => <MyProfileComponent />,
  },
  {
    divider: true,
    onClick: signOut,
    Component: () => <SignOutComponent />,
  },
];

export default function Header() {
  const [session, loading] = useSession();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Button
      id="basic-button"
      aria-controls="basic-menu"
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
      onClick={handleClick}
    >
      <Avatar alt={session?.user?.name} src={session?.user?.image} />
      <Menu
        handleClose={handleClose}
        anchorEl={anchorEl}
        open={open}
        menuItems={MenuItems}
      />
    </Button>
  );
}
