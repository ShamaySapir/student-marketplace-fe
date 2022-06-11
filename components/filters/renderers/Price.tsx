import React, { useEffect, useState } from "react";
import { Grid, Typography, TextField } from "@mui/material";
import { min, max, isNumber, toNumber, isNaN } from "lodash";
import classes from "*.module.css";

export default function RangeSlider({ subFilters, title, onFilter }: any) {
  const [ranges, setRanges] = useState([0, 0]);
  const [currentRanges, setCurrentRanges] = useState([0, 0]);

  useEffect(() => {
    const maxV = max(subFilters?.map((f: any) => f.title)) as number;
    setRanges([0, maxV]);
    setCurrentRanges([0, maxV]);
  }, [subFilters]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    const { value } = e.target;
    if (validatePrice(value)) {
      let newCurrRanges = [...currentRanges];
      if (type === "min") {
        newCurrRanges[0] = +value;
      } else {
        newCurrRanges[1] = +value;
      }
      setCurrentRanges(newCurrRanges);

      onFilter({
        value: { ranges, currentRanges: newCurrRanges },
        price: true,
      });
    }
  };
  const validatePrice = (currentValue: string) => {
    const parsedNumber = toNumber(currentValue);
    return isNumber(parsedNumber) && !isNaN(parsedNumber);
  };

  return (
    <Grid container>
      <Grid item>
        <Typography fontFamily={'Lato'}>{title}</Typography>
      </Grid>
      <Grid container item justifyContent="center" alignItems="center">
        <Grid item>
          <TextField
            // error
            // label="Starts"
            value={currentRanges[0]}
            onChange={(e) => handleChange(e, "min")}
            // defaultValue={ranges[0]}
            sx={{ m: 1, width: "5ch" }}
            variant="standard"
            InputProps={{
              style:{
                fontFamily: 'Lato'
              }
          }}
            // fullWidth
          />
        </Grid>
        <Grid item>
          <Typography fontFamily={'Lato'}>To:</Typography>
        </Grid>
        <Grid item>
          <TextField
            // style={{fontFamily:'Lato', justifyContent:'center'}}
            error={false}
            // label="Error"
            value={currentRanges[1]}
            // defaultValue={ranges[1]}
            onChange={(e) => handleChange(e, "max")}
            variant="standard"
            sx={{ m: 1, width: "5ch" }}
            InputProps={{
              style:{
                fontFamily: 'Lato'
              }
          }}
            // fullWidth
          />
          {/* </div> */}
        </Grid>
      </Grid>
      {/* </Box> */}
    </Grid>
  );
}
