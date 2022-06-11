import React from "react";
import { signOut, useSession } from "next-auth/client";
import {
  Avatar,
  Button,
  ListItemIcon,
  ListItemText,
  Grid,
  Typography,
} from "@mui/material";
import Menu from "./Menu";
import Link from "next/link";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShopTwoIcon from "@mui/icons-material/ShopTwo";
import { styled } from "@mui/material/styles";
import { UserType } from "../../constants";

const SignOutComponent = () => (
  <div>
    <Grid container>
      <Grid item>
        <ListItemIcon>
          <ExitToAppIcon fontSize="small" />
        </ListItemIcon>
      </Grid>
      <Grid item>
      <ListItemText
          disableTypography
          primary={<Typography style={{fontFamily: 'Lato'}}>Logout</Typography>}/>
      </Grid>
    </Grid>
  </div>
);

const MyProfileComponent = () => (
  <Link href="/profile" passHref>
    <Grid container>
      <Grid item>
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
      </Grid>
      <Grid item>
      <ListItemText
          disableTypography
          primary={<Typography style={{fontFamily: 'Lato'}}>My Profile</Typography>}/>
      </Grid>
    </Grid>
  </Link>
);

const BecomeASellerComponent = () => (
  <Link href="/becomeSeller" passHref>
    <Grid container>
      <Grid item>
        <ListItemIcon>
          <StorefrontIcon fontSize="small" />
        </ListItemIcon>
      </Grid>
      <Grid item>
        <ListItemText
          disableTypography
          primary={<Typography style={{fontFamily: 'Lato'}}>Become A Seller</Typography>}/>
      </Grid>
    </Grid>
  </Link>
);

const OrderHistoryComponent = () => (
  <Link href="/orderHistory" passHref>
    <Grid container>
      <Grid item>
        <ListItemIcon>
          <ShopTwoIcon fontSize="small" />
        </ListItemIcon>
      </Grid>
      <Grid item>
        <ListItemText
          disableTypography
          primary={<Typography style={{fontFamily: 'Lato'}}>Orders History</Typography>}/>
      </Grid>
    </Grid>
  </Link>
);

const AddServiceComponent = () => (
  <Link href="/service/new" passHref>
    <Grid container>
      <Grid item>
        <ListItemIcon>
          <ShopTwoIcon fontSize="small" />
        </ListItemIcon>
      </Grid>
      <Grid item>
        <ListItemText
          disableTypography
          primary={<Typography style={{fontFamily: 'Lato'}}>Add Service</Typography>}/>
      </Grid>
    </Grid>
  </Link>
);

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const buyerMenuItems = [
  {
    Component: () => <MyProfileComponent />,
  },
  {
    Component: () => <OrderHistoryComponent />,
  },
  {
    Component: () => <BecomeASellerComponent />,
  },
  {
    divider: true,
    onClick: signOut,
    Component: () => <SignOutComponent />,
  },
];

const sellerMenuItems = [
  {
    Component: () => <MyProfileComponent />,
  },
  {
    Component: () => <OrderHistoryComponent />,
  },
  {
    Component: () => <AddServiceComponent />,
  },
  {
    divider: true,
    onClick: signOut,
    Component: () => <SignOutComponent />,
  },
];

export default function Header() {
  const [session, loading] = useSession();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar
          alt={session!.user!.name as string}
          src={session!.user!.image as string}
        />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        // MenuListProps={{
        //   "aria-labelledby": "basic-button",
        // }}
        menuItems={
          (session?.user.type === UserType.seller && sellerMenuItems) ||
          buyerMenuItems
        }
      ></Menu>
    </div>
  );
}
