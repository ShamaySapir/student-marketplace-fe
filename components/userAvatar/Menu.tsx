import * as React from "react";
import { Menu, MenuItem, MenuProps, Divider } from "@mui/material";
import { map, noop } from "lodash";

interface IProps {
  open: boolean;
  handleClose: () => void;
  anchorEl?: MenuProps["anchorEl"];
  menuItems: Array<any>;
}

export default function BasicMenu({
  open,
  handleClose = noop,
  anchorEl,
  menuItems,
  ...props
}: IProps & MenuProps) {
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      {...props}
    >
      {map(menuItems, ({ divider, onClick = noop, Component }, idx) => {
        return (
          <div key={idx}>
            {divider && <Divider />}
            <MenuItem
              key={idx}
              onClick={(e: any) => {
                onClick(e);
                handleClose();
              }}
            >
              <Component />
            </MenuItem>
          </div>
        );
      })}
    </Menu>
  );
}
