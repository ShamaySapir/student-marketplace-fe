import { Button } from "@mui/material";

interface IProps {}

export default function GoogleProviderSignin(props: IProps) {
  return (
    <Button variant="outlined" {...props}>
      Sign In
    </Button>
  );
}
