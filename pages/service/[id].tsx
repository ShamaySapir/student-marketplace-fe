import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InfoIcon from "@mui/icons-material/Info";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
// web3
import Web3 from "web3";
import MyContract from "../../contracts/S2SABI.json";
import { useWeb3React } from "@web3-react/core";
// end web3
const tokenAddress = "0x28eAc900e08E7473c922Dc925e56330CB11692D2"; // might need to be changed..

import {
  Grid,
  Button,
  Paper,
  Card,
  CardMedia,
  Typography,
  IconButton,
  Rating,
  Dialog,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import * as routes from "../../tools/api/routes";
import { Service } from "../../types/types";
import BootstrapDialogTitle from "../../components/dialogTitle";
import Link from "next/link";
import { setCookie, getCookie } from "../../tools/cookieUtil";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ItemPage() {
  const [session, loading] = useSession();

  const [getItemDesc, setItemDesc] = useState<Service>({
    id: "",
    image: "",
    price: 0,
    rating: 0,
    serviceGroup: "",
    title: "",
    description: "",
    sellerDesc: "",
    sellerPhone: "",
    walletNumber: "",
  });
  const [purchaseStatus, setPurchaseStatus] = useState<Boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [transactionId, setTransactionId] = useState<string>("");
  const router = useRouter();
  const { id } = router.query;

  // web3
  const { account } = useWeb3React();
  let web3;
  let contract;
  // web3 - end

  useEffect(() => {
    async function getItemDescription() {
      const itemDescription = await routes.getService({
        itemId: id as string,
      });
      setItemDesc(itemDescription);
    }
    getItemDescription();
  }, [id]);

  const setOrUpdateCookie = async () => {
    const cookieName = "rating";
    const cookie = getCookie(cookieName);
    let itemSet = new Set(cookie ? Array.from(JSON.parse(cookie)) : []);
    itemSet.add(id);
    setCookie(cookieName, JSON.stringify(itemSet), 1000);
  };

  // web3
  async function transferMoney() {
    try {
      web3 = new Web3((window as any).ethereum);
      contract = new web3.eth.Contract((MyContract as any).abi, tokenAddress);
      console.log(contract);
      let receiver_address = getItemDesc.walletNumber; // change this when using the real marketplace (seller wallet address)
      let tokens_count = quantity * getItemDesc.price; // change this when using the real marketplace (price of item * quantity) TODO: add quantity to form, and mul with price!!!!
      let weiAmount = Web3.utils.toWei(tokens_count.toString());
      const result = await contract.methods
        .transfer(receiver_address, weiAmount)
        .send({ from: account });
      const { from, to, transactionHash } = result; // use this in the receipt TODO: Sapir - need to add this to the summary of the deal.
      setTransactionId(transactionHash);
      return result;
    } catch (error) {
      return false;
    }
  }
  // web3 - end

  const purchase = async () => {
    const blockchainTransferResult = await transferMoney();
    if (blockchainTransferResult !== false) {
      const purchaseResult = await routes.postPurchase({
        buyerId: session?.user.googleId as string,
        itemId: id as string,
        quantity,
      });

      if (purchaseResult.status === 201) {
        setPurchaseStatus(true);
        setOrUpdateCookie();
      }
      handleClickOpen();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container>
        <Grid container item direction={"column"} xs padding={4}>
          <Grid item>
            <Typography variant="h2">{getItemDesc.title}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4">{getItemDesc.description}</Typography>
          </Grid>
          <Grid container item justifyContent="flex-end" alignItems="center">
            <Grid item>
              <Typography variant="h5">{getItemDesc.price}</Typography>
            </Grid>
            <Grid item>
              <AttachMoneyIcon />
            </Grid>
          </Grid>
          <Grid container item>
            <Typography variant="caption">Rating</Typography>
            <Grid container item>
              <Rating defaultValue={getItemDesc.rating} disabled />
            </Grid>
          </Grid>
          <Divider />
          <Grid container direction={"column"}>
            <Grid item>
              <Typography variant="h5">About the seller</Typography>
            </Grid>
            <Grid container item alignItems={"center"}>
              <IconButton aria-label="add to favorites">
                <InfoIcon />
              </IconButton>
              <Typography>{getItemDesc.sellerDesc}</Typography>
            </Grid>
            <Grid container>
              <IconButton aria-label="add to favorites">
                <LocalPhoneIcon />
              </IconButton>
              <Typography>{getItemDesc.sellerPhone}</Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container item justifyContent={"space-around"}>
            <Grid item>
              <Typography variant="caption">Quantity</Typography>
              <Grid container item alignItems={"center"}>
                <IconButton
                  color="primary"
                  component="span"
                  onClick={() => {
                    setQuantity(Math.max(quantity - 1, 1));
                  }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography>{quantity}</Typography>
                <IconButton
                  color="primary"
                  component="span"
                  onClick={() => {
                    setQuantity(quantity + 1);
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item padding={2}>
              <Button variant="contained" onClick={purchase}>
                Purchase ({quantity * getItemDesc.price}$)
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Card>
            <CardMedia
              component="img"
              height="600"
              image={getItemDesc.image}
              alt={getItemDesc.title}
            />
          </Card>
        </Grid>
      </Grid>
      <Grid container></Grid>

      <Dialog open={open} disableEscapeKeyDown={false}>
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={() => handleClose()}
        >
          Your purchase completed successfully
        </BootstrapDialogTitle>
        <DialogContent>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Purchase Details:
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Product/Service Name: {getItemDesc.title}
          </Typography>
          <Typography variant="h6">
            Seller Description: {getItemDesc.sellerDesc}
          </Typography>
          <Typography variant="h6">Item Price: {getItemDesc.price}</Typography>
          <Typography variant="h6">Quantity: {quantity}</Typography>

          <Typography variant="h6">
            Total Price: {quantity * getItemDesc.price}
          </Typography>
          <Typography variant="h6">
            Transaction Hash: {transactionId}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Link href="/" passHref>
            <Button>Back to main page</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
}
