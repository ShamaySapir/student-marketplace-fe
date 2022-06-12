import React from "react";
import {
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
  Checkbox,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { map, noop } from "lodash";
import { styled } from "@mui/material/styles";

export interface IFilterItemProps {
  title: string;
  subFilters?: IFilterItemProps[];
  indent?: number;
  inheritChecked?: boolean;
  onFilter: any;
}
const INDENT = 2;
import { Price, Rating, TextSearch } from "./renderers";
const customRenderers = (title: string, subFilters: any, onFilter: any) => {
  const renderers = {
    Rating: (props: any) => <></>, //<Rating {...props} />,
    Price: (props: any) => <Price {...props} onFilter={onFilter} />,
    Title: (props: any) => <TextSearch {...props} onFilter={onFilter} />,
  };
  return ((renderers as any)[title] || noop)({ title, subFilters });
};

export default function FilterItem({
  title,
  subFilters,
  indent = 0,
  inheritChecked = true,
  onFilter = noop,
}: IFilterItemProps) {
  const [open, setOpen] = React.useState(true);
  const [checked, setChecked] = React.useState(inheritChecked);

  const handleClick = () => {
    setOpen(!open);
  };
  
  return (
    customRenderers(title, subFilters, onFilter) || (
      <>
        <ListItemButton onClick={handleClick} sx={{ pl: indent }}>
          <ListItemIcon>
            <Checkbox
              checked={checked}
              name={title}
              onChange={(e, v) => {
                setChecked(e.target.checked);
                onFilter({ name: e.target.name, checked: e.target.checked });
              }}
            />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={<Typography style={{fontFamily: 'Lato'}}>{title}</Typography>}/>
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
                  onFilter={onFilter}
                />
              ))}
            </List>
          </Collapse>
        )}
      </>
    )
  );
}
