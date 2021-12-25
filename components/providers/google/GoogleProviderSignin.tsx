import { Button } from "@mui/material";

interface IProps {
  onClick: () => Promise<undefined>;
}

export default function GoogleProviderSignin(props: IProps) {
  return (
    <Button variant="outlined" {...props}>
      Sign In
    </Button>
  );
}
