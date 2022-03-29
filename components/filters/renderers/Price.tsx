import React, { useEffect, useState } from "react";
import { Grid, Slider, Typography } from "@mui/material";
import { min, max } from "lodash";

function valuetext(value: number) {
  return `${value}°C`;
}

export default function RangeSlider({ subFilters, title }: any) {
  const [value, setValue] = React.useState<number[]>([20, 37]);

  // const [value, setValue] = useState<number[]>([0, 100]);
  const [calcReady, setCalcReady] = useState<Boolean>(false);
  // const [minVal, setMinVal] = useState<number>(0);
  // const [maxVal, setMaxVal] = useState<number>(0);

  useEffect(() => {
    const minV = min(subFilters?.map((f: any) => f.title)) as number;
    const maxV = max(subFilters?.map((f: any) => f.title)) as number;
    setValue([minV, maxV]);
    setCalcReady(true);
    // setMinVal(maxV);
    // setMaxVal(maxV);
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
        {calcReady && (
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={value}
            min={value[0]}
            max={value[1]}
            step={1}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
        )}
      </Grid>
    </Grid>
  );
}
