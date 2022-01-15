import React, { useEffect, useState } from "react";
import { Grid, Slider, Typography } from "@mui/material";
import { min, max } from "lodash";

function valuetext(value: number) {
  return `${value}°C`;
}

export default function RangeSlider({ subFilters, title }: any) {
  const [value, setValue] = useState<number[]>([0, 100]);
  const [minVal, setMinVal] = useState<number>(0);
  const [maxVal, setMaxVal] = useState<number>(0);

  useEffect(() => {
    const minV = min(subFilters?.map((f: any) => f.title)) as number;
    const maxV = max(subFilters?.map((f: any) => f.title)) as number;
    setValue([minV, maxVal]);
    setMinVal(minV);
    setMaxVal(maxV);
  }, [subFilters]);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography>{title}</Typography>
      </Grid>
      <Grid item>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          max={maxVal}
          min={minVal}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
      </Grid>
    </Grid>
  );
}
