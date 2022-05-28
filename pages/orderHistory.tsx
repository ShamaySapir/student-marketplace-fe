import React, { useEffect, useState } from "react";
import {
  Paper,
  Grid,
  Typography,
  Box,
  Divider,
  Link,
  Breadcrumbs,
} from "@mui/material";
import Table from "../components/table";
import * as routes from "../tools/api/routes";
import { useSession } from "next-auth/client";
import { UserPurchases, HeadCell } from "../types/types";
import { UserType } from "../constants";
import { keyBy } from "lodash";
import { Home, Person } from "@mui/icons-material";
import ReorderIcon from '@mui/icons-material/Reorder';

type Order = "asc" | "desc";

const headCells: readonly HeadCell[] = [
  {
    id: "date",
    numeric: false,
    disablePadding: true,
    label: "Date",
  },
  {
    id: "sellerName",
    numeric: false,
    disablePadding: false,
    label: "Seller Name",
  },
  {
    id: "itemName",
    numeric: false,
    disablePadding: false,
    label: "Item Name",
  },
  {
    id: "quantity",
    numeric: true,
    disablePadding: false,
    label: "Quantity",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "totalPrice",
    numeric: true,
    disablePadding: false,
    label: "Total Price",
  },
];

const buyerHeadCells: readonly HeadCell[] = [
  ...headCells,
  { id: "rating", numeric: false, disablePadding: false, label: "Rating" },
];

export default function EnhancedTable() {
  const [purchasesData, setPurchasesData] = useState<UserPurchases[]>([]);
  const [sellsData, setSellsData] = useState<UserPurchases[]>([]);

  const [session, loading] = useSession();

  useEffect(() => {
    async function getUserBuyHistory() {
      const userHistory = await routes.getPurchases({
        userId: session?.user.googleId as string,
      });

      const userRankedItemsArr = await routes.getUserRankedItems({
        userId: session?.user.googleId as string,
      });
      const userRankedItems = keyBy(userRankedItemsArr, "itemId");
      const updatedUserHistory = userHistory.map((item) => ({
        ...item,
        rating: userRankedItems[item.itemId]?.rating || 0,
      }));
      setPurchasesData(updatedUserHistory);
    }
    async function getUserSellsHistory() {
      const userHistory = await routes.getUserSells({
        userId: session?.user.googleId as string,
      });
      setSellsData(userHistory);
    }
    getUserBuyHistory();
    getUserSellsHistory();
  }, []);

  return (
    <Box sx={{ml:20,mr:20,mt:5,mb:10}}>
      <Grid
        className="breadCrumbs"
        mt={2}
        mb={2}
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            sx={{
              display: "flex",
              alignItems: "center",
              ":hover": { color: "#205375" },
            }}
            color="inherit"
            href="/"
            fontSize={"20px"}
          >
            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
          <Link
            underline="hover"
            sx={{
              display: "flex",
              alignItems: "center",
              ":hover": { color: "#205375" },
            }}
            color="inherit"
            href="/orderHistory"
            fontSize={"20px"}
          >
            <ReorderIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Order history
          </Link>
        </Breadcrumbs>
      </Grid>

      <Divider />
      <Typography
        variant="h4"
        textAlign={"center"}
        sx={{ mt: 4, color: "#224870" }}
      >
        <strong>Orders History</strong>
      </Typography>
      <Grid mt={5} item>
        <Table
          data={purchasesData}
          title={"Orders"}
          headCells={buyerHeadCells}
        />
      </Grid>

      {session?.user.type === UserType.seller && (
        <Grid mt={5}>
          <Typography
            variant="h4"
            textAlign={"center"}
            sx={{ mt: 4, color: "#224870" }}
          >
            <strong>Sells History</strong>
          </Typography>{" "}
          <Grid mt={5}>
            <Table data={sellsData} title={"Sells"} headCells={headCells} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
