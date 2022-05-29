import { styled } from "@mui/material/styles";

const MyFooter = styled('footer')({
  color: "white",
  backgroundColor: "#224870",
  padding: 8,
  borderRadius: 4,
  alignItems: "center",
  textAlign: "center",
});


export default function Footer() {
  return <MyFooter>Footer</MyFooter>;
}
