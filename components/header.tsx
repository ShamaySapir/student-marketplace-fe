import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/client";
import GoogleProviderSignin from "./providers/google/GoogleProviderSignin";
import UserAvatar from "./userAvatar";
import { Adb as AdbIcon, Menu as MenuIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import {
  IconButton,
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Tooltip,
} from "@mui/material";
import { Button } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import * as routes from "../tools/api/routes";
import { keyBy } from "lodash";
//web 3
import { injected } from "../wallet/connector";
import { useWeb3React } from "@web3-react/core";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const DecoratedLink = styled(Link)(({ theme }) => ({
  "text-transform": "none",
}));
// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.

export default function Header() {
  const [session, loading] = useSession();
  const [rankedItems, setRankedItems] = useState<number>(0);
  const [walletAccount, setWalletAccount] = useState<string>("");
  const { account, activate, active } = useWeb3React();

  useEffect(() => {
    async function getUserBuyHistory() {
      const userHistory = await routes.getPurchases({
        userId: session?.user.googleId as string,
      });
      const userPurchases = keyBy(userHistory, "itemId");
      const numPurchases = Object.keys(userPurchases).length;

      const userRankedItemsArr = await routes.getUserRankedItems({
        userId: session?.user.googleId as string,
      });

      const numRanked = Object.keys(userRankedItemsArr).length;
      setRankedItems(Math.max(numPurchases - numRanked, 0));
    }
    getUserBuyHistory();
  }, []);

  async function connect() {
    try {
      await activate(injected);
      const accountAddress = await (window as any).ethereum.enable();
      setWalletAccount(accountAddress);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
            }}
          >
            Student social marketplace
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            {session && (
              <>
                <Button color="secondary" id="connectBTN" onClick={connect}>
                  {walletAccount || "Connect to wallet"}
                </Button>
                <IconButton size="large" color="inherit" edge="end">
                  <Link href="/orderHistory">
                    <Badge badgeContent={rankedItems} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </Link>
                </IconButton>
              </>
            )}
            <Tooltip title="Open settings">
              {(session && <UserAvatar />) || (
                <GoogleProviderSignin onClick={() => signIn("google")} />
              )}
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    // <Box
    //   sx={{ color: "primary.main", backgroundColor: "primary.main" }}
    //   marginBottom="10px"
    // >
    //   <Box
    //     sx={{
    //       display: "grid",
    //       gridTemplateColumns: "repeat(1, 1fr)",
    //       gridTemplateAreas: `"title avatar"`,
    //       alignItems: "center",
    //     }}
    //   >
    //     <Box sx={{ backgroundColor: "primary.main" }}>
    //       <Box sx={{ gridArea: "title", backgroundColor: "primary.main" }}>
    //         {/* <Div
    //           style={{
    //             display: "flex",
    //             justifyContent: "space-between",
    //             backgroundColor: "primary.main",
    //           }}
    //         > */}
    //         <DecoratedLink href="/">Student social marketplace</DecoratedLink>
    //         <IconButton size="large" color="inherit">
    //           <Link href="/orderHistory">
    //             <Badge badgeContent={rankedItems} color="error">
    //               <NotificationsIcon />
    //             </Badge>
    //           </Link>
    //         </IconButton>
    //         {/* </Div> */}
    //       </Box>
    //     </Box>
    //     <Box sx={{ gridArea: "avatar" }}>
    //       <Box>
    //         {(session && <UserAvatar />) || (
    //           <GoogleProviderSignin onClick={() => signIn("google")} />
    //         )}
    //       </Box>
    //     </Box>
    //   </Box>
    // </Box>
  );
}
