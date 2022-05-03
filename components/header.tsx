import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import { Box, Avatar } from "@mui/material";
import GoogleProviderSignin from "./providers/google/GoogleProviderSignin";
import UserAvatar from "./userAvatar";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import * as routes from "../tools/api/routes";
import { keyBy } from "lodash";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));
// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.

export default function Header() {
  const [session, loading] = useSession();
  const [rankedItems, setRankedItems] = useState<number>(0);

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

  return (
    <Box sx={{ color: "primary.main" }} marginBottom="10px">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(1, 1fr)",
          gridTemplateAreas: `"title avatar"`,
          alignItems: "center",
        }}
      >
        <Box>
          <Box sx={{ gridArea: "title" }}>
            <Div style={{ display: "flex", justifyContent: "space-between" }}>
              <Link href="/">Student social marketplace</Link>
              <IconButton
                size="large"
                aria-label="show x new notifications"
                color="inherit"
              >
                <Link href="/orderHistory">
                  <Badge badgeContent={rankedItems} color="error">
                    <NotificationsIcon />
                  </Badge>
                </Link>
              </IconButton>
            </Div>
          </Box>
        </Box>
        <Box sx={{ gridArea: "avatar" }}>
          <Box>
            {(session && <UserAvatar />) || (
              <GoogleProviderSignin onClick={() => signIn("google")} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
