import * as React from "react";
import { List, ListSubheader } from "@mui/material";
import { map } from "lodash";
import FilterItem from "./FilterItem";

export default function FiltersList() {
  const generateFilterItems = () => [
    {
      title: "a",
      subFilters: [{ title: "b", subFilters: [{ title: "c" }] }],
    },
    {
      title: "test",
      subFilters: [
        { title: "test2", subFilters: [{ title: "test3" }] },
        { title: "test4" },
      ],
    },
    { title: "m" },
  ];
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
    >
      {map(generateFilterItems(), (filterDetails, idx) => (
        <FilterItem
          key={idx}
          title={filterDetails.title}
          subFilters={filterDetails.subFilters}
        />
      ))}
    </List>
  );
}
