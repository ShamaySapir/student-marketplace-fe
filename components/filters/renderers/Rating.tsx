import React, { useEffect, useState } from "react";
import { Grid, Typography, Rating } from "@mui/material";
import { min } from "lodash";

export default function RangeSlider({ subFilters, title }: any) {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    const allVals: number[] = subFilters.map(
      ({ title }: { title: number }) => title
    );
    setValue(min(allVals) || 0);
  }, [subFilters]);

  const handleChange = (
    event: React.SyntheticEvent<Element | Event>,
    newValue: number | null
  ) => {
    setValue(newValue as number);
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography>{title}</Typography>
      </Grid>
      <Grid item>
        <Rating value={value} precision={0.5} onChange={handleChange} />
      </Grid>
    </Grid>
  );
}
