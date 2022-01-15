import * as React from "react";
import {
  List,
  ListSubheader,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
  Checkbox,
} from "@mui/material";
import {
  MoveToInbox as InboxIcon,
  Drafts as DraftsIcon,
  Send as SendIcon,
  ExpandLess,
  ExpandMore,
  StarBorder,
} from "@mui/icons-material";
import FilterItem from "./FilterItem";

export default function FiltersList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

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
      <ListItemButton>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Sent mail" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItemButton>
      <FilterItem
        title="test"
        subFilters={[
          { title: "test2", subFilters: [{ title: "test3" }] },
          { title: "test4" },
        ]}
      />
    </List>
  );
}
