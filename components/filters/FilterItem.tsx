import * as React from "react";
import {
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
  Checkbox,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { map } from "lodash";
export interface IFilterItemProps {
  title: string;
  subFilters?: IFilterItemProps[];
  indent?: number;
  inheritChecked?: boolean;
}
const INDENT = 2;
export default function FilterItem({
  title,
  subFilters,
  indent = 0,
  inheritChecked = false,
}: IFilterItemProps) {
  const [open, setOpen] = React.useState(true);
  const [checked, setChecked] = React.useState(inheritChecked);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ pl: indent }}>
        <ListItemIcon>
          <Checkbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        </ListItemIcon>
        <ListItemText primary={title} />
        {subFilters && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {subFilters && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {map(subFilters, (subFilter, idx) => (
              <FilterItem
                {...subFilter}
                key={idx}
                indent={indent + INDENT}
                inheritChecked={checked}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}
