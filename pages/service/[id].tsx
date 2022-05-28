import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InfoIcon from "@mui/icons-material/Info";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import DescriptionIcon from "@mui/icons-material/Description";
import AccessibilityIcon from "@mui/icons-material/Accessibility";

import { Add as AddIcon, Home, Remove as RemoveIcon } from "@mui/icons-material";
// web3
import Web3 from "web3";
import MyContract from "../../contracts/S2SABI.json";
import { useWeb3React } from "@web3-react/core";
// end web3
const tokenAddress = "0x28eAc900e08E7473c922Dc925e56330CB11692D2"; // might need to be changed..

import {
  Grid,
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
  TextField,
  Stack,
  Box,
  Breadcrumbs,
  Link
} from "@mui/material";
import { styled } from "@mui/material/styles";
import * as routes from "../../tools/api/routes";
import { Service } from "../../types/types";
import BootstrapDialogTitle from "../../components/dialogTitle";
import { setCookie, getCookie } from "../../tools/cookieUtil";
import SellIcon from "@mui/icons-material/Sell";
import Button, { ButtonProps } from "@mui/material/Button";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

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

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: "white",
    backgroundColor: "#224870",
    borderRadius: "4",
    "&:hover": {
      backgroundColor: "#224870",
      color: "#44CFCB",
      border: "2px solid",
      borderColor: "white",
    },
  }));

  return (
    <>
    <Box sx={{ml:10,mr:10,mt:5,mb:10}}>
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
            href="/" //change here
            fontSize={"20px"}
          >
            <ShoppingBagIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Item page
          </Link>
        </Breadcrumbs>
      </Grid>

      <Divider />
      <Typography
        variant="h3"
        textAlign={"center"}
        sx={{ mt: 4, color: "#224870" }}
      >
        <strong>Item page</strong>
      </Typography>

      <Grid  container>
        <Grid lg={7} container item direction={"column"} xs padding={5}>
          <Grid item>
            <Typography textAlign={"center"} color={"#224870"} variant="h5">
              <strong>Item</strong>
            </Typography>
          </Grid>
          <Stack ml={3} mt={2} direction={"row"} spacing={3}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InfoIcon />
                  </InputAdornment>
                ),
              }}
              // variant="filled"
              disabled
              label="Item type"
              value={getItemDesc.serviceGroup}
            />

            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionIcon />
                  </InputAdornment>
                ),
              }}
              // variant="filled"
              disabled
              multiline
              label="Item description"
              value={getItemDesc.description}
            />
          </Stack>

          <Grid item mt={2}>
            <Typography textAlign={"center"} color={"#224870"} variant="h5">
              <strong>Seller</strong>
            </Typography>
          </Grid>

          <Stack ml={3} mt={2} direction={"row"} spacing={3}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
              // variant="filled"
              disabled
              label="Seller phone"
              value={getItemDesc.sellerPhone}
            />
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccessibilityIcon />
                  </InputAdornment>
                ),
              }}
              // variant="filled"
              disabled
              multiline
              label="Seller description"
              value={getItemDesc.sellerDesc}
            />
          </Stack>

          <Grid container item mt={4} justifyContent={"center"}>
            <Rating defaultValue={getItemDesc.rating} disabled />
          </Grid>

          <Grid ml={4} mt={7} container item justifyContent={"space-between"}>
            <Grid item>
              <Typography variant="h6">
                <strong>Quantity</strong>
              </Typography>
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
            <Grid mr={7} item padding={2}>
              <ColorButton
                endIcon={<SellIcon />}
                variant="contained"
                onClick={purchase}
              >
                <strong> Buy now </strong>({quantity * getItemDesc.price} S2S)
              </ColorButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid lg={5} item xs p={5}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={
                getItemDesc.image.startsWith("http")
                  ? getItemDesc.image
                  : `${process.env.NEXT_PUBLIC_MARKETPLACE_API}/${getItemDesc.image}`
              }
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
          <Link href="/">
            <Button>Back to main page</Button>
          </Link>
        </DialogActions>
      </Dialog>
      </Box>
    </>
  );
}
