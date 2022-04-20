import React, { useEffect, useState } from "react";
import { Paper, Grid } from "@mui/material";
import Table from "../components/table";
import * as routes from "../tools/api/routes";
import { useSession } from "next-auth/client";
import { UserPurchases } from "../types/types";
import { UserType } from "../constants";

type Order = "asc" | "desc";

interface HeadCell {
  disablePadding: boolean;
  id: keyof UserPurchases;
  label: string;
  numeric: boolean;
}

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

export default function EnhancedTable() {
  const [purchasesData, setPurchasesData] = useState<UserPurchases[]>([]);
  const [sellsData, setSellsData] = useState<UserPurchases[]>([]);

  const [session, loading] = useSession();

  useEffect(() => {
    async function getUserBuyHistory() {
      const userHistory = await routes.getPurchases({
        userId: session?.user.googleId as string,
      });
      setPurchasesData(userHistory);
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
    <Grid container>
      <Grid item>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <Table
            data={purchasesData}
            title={"Orders History"}
            headCells={headCells}
          />
        </Paper>
      </Grid>
      {session?.user.type === UserType.seller && (
        <Grid item>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <Table data={sellsData} title={"Sells"} headCells={headCells} />
          </Paper>
        </Grid>
      )}
    </Grid>
  );
}
