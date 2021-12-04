import * as React from "react";
import { Menu, MenuItem, MenuProps, Divider } from "@mui/material";
import { map, noop } from "lodash";
import Link from "next/link";
interface IProps {
  open: boolean;
  handleClose: MenuProps["onClose"];
  anchorEl?: MenuProps["anchorEl"];
  menuItems: Array<any>;
}

export default function BasicMenu({
  open,
  handleClose = noop,
  anchorEl,
  menuItems,
}: IProps) {
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      {map(menuItems, ({ divider, onClick = noop, Component }, idx) => {
        return (
          <div key={idx}>
            {divider && <Divider />}
            <MenuItem
              onClick={(e: any, rest: any) => {
                onClick(e);
                handleClose(e, rest);
              }}
            >
              <Link href="registration" passHref>
                <Component />
              </Link>
            </MenuItem>
          </div>
        );
      })}
    </Menu>
  );
}
