import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/client";
import GoogleProviderSignin from "./providers/google/GoogleProviderSignin";
import UserAvatar from "./userAvatar";
import Image from "next/image";
import {
  AccountBalanceWalletTwoTone as WalletIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";

import { styled } from "@mui/material/styles";
import Link from "next/link";
import {
  IconButton,
  AppBar,
  Avatar,
  Box,
  Container,
  Toolbar,
  Typography,
  Tooltip,
  Badge,
} from "@mui/material";
import * as routes from "../tools/api/routes";
import { keyBy } from "lodash";
//web 3
import { injected } from "../wallet/connector";
import { useWeb3React } from "@web3-react/core";

const StyledNavBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#224870",
});
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setWalletAddress, getWalletAddress } from "../redux/slices/crypto";
// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.

export default function Header() {
  const dispatch = useAppDispatch();
  const walletAccount = useAppSelector(getWalletAddress);
  const [session, loading] = useSession();
  const [rankedItems, setRankedItems] = useState<number>(0);
  const { activate } = useWeb3React();

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
      dispatch(setWalletAddress(accountAddress));
    } catch (error) {
      console.log(error);
    }
  }

  const StyledSiteTitle = styled(Typography)(({ theme })=>({
    fontFamily:"Lato",
    m:2,
    color:"white",
    fontSize:"18px",
    sx:{":hover": { fontWeight: "bold" }}
  }));

  return (
    <AppBar sx={{ backgroundColor: "#224870" }} position="sticky">
      <Container maxWidth="xl">
        <StyledNavBar disableGutters>
          <Avatar
            alt="logo"
            sx={{ width: 40, height: 40 }}
            style={{ marginRight: 10 }}
          >
            <Image
              src={"/images/coin.png"}
              alt={"logo"}
              width={40}
              height={40}
            />
          </Avatar>
          <Box
            sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
            component={Link}
            href="/"
          >
            <StyledSiteTitle>
              Student Social Marketplace{" "}
            </StyledSiteTitle>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Box sx={{ display: { xs: "flex", md: "flex" }, gap: 2 }}>
            {session && (
              <>
                <IconButton
                  size="small"
                  color="inherit"
                  edge="end"
                  onClick={connect}
                >
                  {walletAccount || (
                    <>
                      &nbsp;
                      <WalletIcon />
                    </>
                  )}
                </IconButton>
                <IconButton size="large" color="inherit" edge="end">
                  <Link href="/orderHistory" passHref>
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
        </StyledNavBar>
      </Container>
    </AppBar>
  );
}
