import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/client";
import { Web3ReactProvider } from "@web3-react/core";
import type { provider } from "web3-core";

import Web3 from "web3";
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
  Button,
  Badge,
  Divider,
} from "@mui/material";
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

const StyledNavBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#224870",
});

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
  // useEffect(() => {
  //   return () => {
  //     console.log("unmounted");
  //   };
  // });
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

  const getLibrary = (providerInstance: provider) => new Web3(providerInstance);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
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
              <Typography
                m={2}
                color={"white"}
                fontSize={"18px"}
                sx={{ ":hover": { fontWeight: "bold" } }}
              >
                Student social marketplace{" "}
              </Typography>
            </Box>

            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>
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
                        {" "}
                        &nbsp;
                        <WalletIcon />
                      </>
                    )}
                  </IconButton>
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
          </StyledNavBar>
        </Container>
      </AppBar>
    </Web3ReactProvider>
  );
}
