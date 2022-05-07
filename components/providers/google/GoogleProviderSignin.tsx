import { Button } from "@mui/material";

interface IProps {
  onClick: () => Promise<undefined>;
}

export default function GoogleProviderSignin(props: IProps) {
  return (
    <Button variant="contained" color="success" {...props}>
      Sign Up / Sign In
    </Button>
  );
}
