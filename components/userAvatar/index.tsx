import * as React from "react";
import { signOut, useSession } from "next-auth/client";
import {
  Avatar,
  Button,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";
import { map } from "lodash";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
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
        <ListItemText>Logout</ListItemText>
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
        <ListItemText>My Profile</ListItemText>
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
        <ListItemText>Become A Seller</ListItemText>
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
        <ListItemText>Orders History</ListItemText>
      </Grid>
    </Grid>
  </Link>
);

const AddServiceComponent = () => (
  <Link href="/service" passHref>
    <Grid container>
      <Grid item>
        <ListItemIcon>
          <ShopTwoIcon fontSize="small" />
        </ListItemIcon>
      </Grid>
      <Grid item>
        <ListItemText>Add Service</ListItemText>
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

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Avatar
            alt={session!.user!.name as string}
            src={session!.user!.image as string}
          />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {map(
                      session?.user.type === UserType.seller
                        ? sellerMenuItems
                        : buyerMenuItems,
                      ({ Component }) => (
                        <MenuItem>
                          <Component />
                        </MenuItem>
                      )
                    )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}
