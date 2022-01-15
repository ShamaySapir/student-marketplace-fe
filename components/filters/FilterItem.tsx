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
interface IFilterItemProps {
  title: string;
  subFilters?: IFilterItemProps[];
  indent?: number;
}
const INDENT = 2;
export default function FilterItem({
  title,
  subFilters,
  indent = 0,
}: IFilterItemProps) {
  const [open, setOpen] = React.useState(true);
  const [checked, setChecked] = React.useState(false);

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
              <FilterItem {...subFilter} key={idx} indent={indent + INDENT} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}
