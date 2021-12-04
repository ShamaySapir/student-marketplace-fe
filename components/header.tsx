import { signIn, signOut, useSession } from "next-auth/client";
import { Box, Typography, Avatar, Button } from "@mui/material";
import GoogleProviderSignin from "./providers/google/GoogleProviderSignin";

import { styled } from "@mui/material/styles";

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
            <Div>Student social marketplace</Div>
          </Box>
        </Box>
        <Box sx={{ gridArea: "avatar" }}>
          <Box>
            {(session && (
              <Avatar alt={session?.user?.name} src={session?.user?.image} />
            )) || <GoogleProviderSignin onClick={() => signIn("google")} />}
          </Box>
        </Box>
      </Box>
    </Box>

    // <header>
    //   <noscript>
    //     <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
    //   </noscript>
    //   <div className={styles.signedInStatus}>
    //     <p
    //       className={`nojs-show ${
    //         !session && loading ? styles.loading : styles.loaded
    //       }`}
    //     >
    //       {!session && (
    //         <>
    //           <span className={styles.notSignedInText}>
    //             You are not signed in
    //           </span>
    //           <a
    //             href={`/api/auth/signin`}
    //             className={styles.buttonPrimary}
    //             onClick={(e) => {
    //               e.preventDefault();
    //               signIn();
    //             }}
    //           >
    //             Sign in
    //           </a>
    //         </>
    //       )}
    //       {session && (
    //         <>
    //           {session.user?.image && (
    //             <span
    //               style={{ backgroundImage: `url(${session.user.image})` }}
    //               className={styles.avatar}
    //             />
    //           )}
    //           <span className={styles.signedInText}>
    //             <small>Signed in as</small>
    //             <br />
    //             <strong>{session.user?.email || session.user?.name}</strong>
    //           </span>
    //           <a
    //             href={`/api/auth/signout`}
    //             className={styles.button}
    //             onClick={(e) => {
    //               e.preventDefault();
    //               signOut();
    //             }}
    //           >
    //             Sign out
    //           </a>
    //         </>
    //       )}
    //     </p>
    //   </div>
    // </header>
  );
}
