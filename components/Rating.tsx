import React from "react";
import { Rating } from "@mui/material";
import * as routes from "../tools/api/routes";
import { useSession } from "next-auth/client";

const RATED_COLOR = "#67b1c7";
const DEFAULT_COLOR = "primary";

const ProductRating = ({ value, itemId, disabled = true }: any) => {
  const [innerValue, setValue] = React.useState<number | null>(value);
  const [session, loading] = useSession();

  function setRating(e: React.SyntheticEvent, newValue: number | null): void {
    routes.patchUpdateRating({
      userId: session?.user.googleId as string,
      itemId,
      rating: `${newValue}`,
    });
    setValue(newValue);
  }
  const isRated = value !== undefined;
  return (
    <Rating
      value={innerValue}
      sx={{ color: isRated ? RATED_COLOR : DEFAULT_COLOR }}
      disabled={isRated}
      onChange={setRating}
    />
  );
};
export default ProductRating;
