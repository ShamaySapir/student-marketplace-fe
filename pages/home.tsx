import { useState } from "react";
import { useSession } from "next-auth/client";
import AccessDenied from "../components/accessDenied";
import { styled } from "@mui/material/styles";
import { string } from "yup/lib/locale";
import { Typography } from "@mui/material";

export default function Page() {
  const [session, loading] = useSession();
  const [content, setContent] = useState();

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return <AccessDenied />;
  }

  const StyledText = styled(Typography)(({ theme })=>({
    fontFamily:"Lato",
  }));

  // If session exists, display content
  return (
    <div>
      <Typography variant="h1">Home</Typography>
      <Typography variant="h6">
        <strong>{content || "\u00a0"}</strong>
      </Typography>
    </div>
  );
}
