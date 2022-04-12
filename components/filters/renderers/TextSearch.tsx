import React, { useEffect, useState } from "react";
import { InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function TextSearch({ onFilter }: { onFilter: any }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilter({ value: e.target.value, textChanged: true });
  };

  return (
    <>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search..."
        onChange={handleChange}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </>
  );
}
