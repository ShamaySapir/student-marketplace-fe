import React, { useEffect, useState } from "react";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function TextSearch({ onFilter }: { onFilter: any }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilter({ value: e.target.value, textChanged: true });
  };

  return (
    <TextField
      sx={{ ml: 2 }}
      placeholder="Search..."
      variant="outlined"
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <IconButton type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
        ),
      }}
    />
  );
}
