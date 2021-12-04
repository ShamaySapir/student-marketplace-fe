import { signIn, signOut, useSession } from "next-auth/client";
import { Box, Typography, Avatar } from "@mui/material";
import PropTypes from "prop-types";

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

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
          <Item sx={{ gridArea: "title" }}>
            <Typography>Student marketplace</Typography>
          </Item>
        </Box>
        <Box sx={{ gridArea: "avatar" }}>
          <Item>
            <Avatar alt={session?.user?.name} src={session?.user?.image} />
          </Item>
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
