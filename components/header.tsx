import { signIn, signOut, useSession } from "next-auth/client";
import { Box, Avatar } from "@mui/material";
import GoogleProviderSignin from "./providers/google/GoogleProviderSignin";
import UserAvatar from "./userAvatar";
import { styled } from "@mui/material/styles";
import Link from "next/link";

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
            <Div>
              <Link href="/">Student social marketplace</Link>
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
