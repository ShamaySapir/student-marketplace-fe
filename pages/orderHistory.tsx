import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Divider,
  Link,
  Breadcrumbs,
} from "@mui/material";
import Table from "../components/table";
import Rating from "../components/Rating";
import * as routes from "../tools/api/routes";
import { useSession } from "next-auth/client";
import { UserPurchases, HeadCell } from "../types/types";
import { UserType } from "../constants";
import { keyBy } from "lodash";
import { Home } from "@mui/icons-material";
import ReorderIcon from "@mui/icons-material/Reorder";
import NextLink from "next/link";

const HEAD_CELL_DATE = {
  id: "date",
  numeric: false,
  disablePadding: false,
  label: "Date",
  renderer: (data: UserPurchases) => (
    <Typography>{new Date(data.date).toLocaleDateString("he-IL")}</Typography>
  ),
};

const HEAD_CELL_ITEM_NAME = {
  id: "itemName",
  numeric: false,
  disablePadding: false,
  label: "Item Name",
  renderer: (data: UserPurchases) => <Typography>{data.itemName}</Typography>,
};
const HEAD_CELL_QUANTITY = {
  id: "quantity",
  numeric: true,
  disablePadding: false,
  label: "Quantity",
  renderer: (data: UserPurchases) => <Typography>{data.quantity}</Typography>,
};

const HEAD_CELL_PRICE = {
  id: "price",
  numeric: true,
  disablePadding: false,
  label: "Price",
  renderer: (data: UserPurchases) => <Typography>{data.price}</Typography>,
};
const HEAD_CELL_TOTAL_PRICE = {
  id: "totalPrice",
  numeric: true,
  disablePadding: false,
  label: "Total Price",
  renderer: (data: UserPurchases) => <Typography>{data.totalPrice}</Typography>,
};

const HEAD_CELL_RATING = {
  id: "rating",
  numeric: false,
  disablePadding: false,
  label: "Rating",
  renderer: (data: UserPurchases) => (
    <Rating value={data.rating} itemId={data.itemId} />
  ),
};

const HEAD_CELL_SELLER_NAME = {
  id: "sellerName",
  numeric: false,
  disablePadding: false,
  label: "Seller Name",
  renderer: (data: UserPurchases) => <Typography>{data.sellerName}</Typography>,
};

const HEAD_CELL_BUYER_NAME = {
  id: "buyerName",
  numeric: false,
  disablePadding: false,
  label: "Buyer Name",
  renderer: (data: UserPurchases) => <Typography>{data.buyerName}</Typography>,
};

const HEAD_CELL_BUYER_EMAIL = {
  id: "buyerEmail",
  numeric: false,
  disablePadding: false,
  label: "Buyer Email",
  renderer: (data: UserPurchases) => <Typography>{data.buyerEmail}</Typography>,
};

const buyerHeadCells: readonly HeadCell[] = [
  HEAD_CELL_DATE,
  HEAD_CELL_ITEM_NAME,
  HEAD_CELL_QUANTITY,
  HEAD_CELL_PRICE,
  HEAD_CELL_TOTAL_PRICE,
  HEAD_CELL_SELLER_NAME,
  HEAD_CELL_RATING,
];
const sellerHeadCells: readonly HeadCell[] = [
  HEAD_CELL_DATE,
  HEAD_CELL_ITEM_NAME,
  HEAD_CELL_QUANTITY,
  HEAD_CELL_PRICE,
  HEAD_CELL_TOTAL_PRICE,
  HEAD_CELL_BUYER_NAME,
  HEAD_CELL_BUYER_EMAIL,
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
    <Box sx={{ ml: 10, mr: 10, mt: 3, mb: 7 }}>
      <Grid
        className="breadCrumbs"
        mt={2}
        mb={2}
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        minWidth="800px"
      >
        <Breadcrumbs aria-label="breadcrumb">
          <NextLink href="/">
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
              fontFamily="Lato"
            >
              <Home sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
          </NextLink>
          <div>
            <ReorderIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Order history
          </div>{" "}
        </Breadcrumbs>
      </Grid>

      <Divider />
      <Typography
        fontFamily="Lato"
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
            fontFamily="Lato"
            variant="h4"
            textAlign={"center"}
            sx={{ mt: 4, color: "#224870" }}
          >
            <strong>Sells History</strong>
          </Typography>
          <Grid mt={5}>
            <Table
              data={sellsData}
              title={"Sells"}
              headCells={sellerHeadCells}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
