import { Menu, MenuItem } from "@mui/material";
import Cookies from "universal-cookie";
import {MenuProps} from '../Interfaces'

export const MenuComponent = ({
  anchorEl,
  onClose,
  handleSignOut,
}: MenuProps) => {
  const open = Boolean(anchorEl);
  const cookies = new Cookies();

  return (
    <Menu
      sx={{ marginTop: "0.5rem" }}
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={onClose}
      onClick={onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem
        sx={{ fontSize: "1rem", padding: "0.5rem", height: "20px" }}
        onClick={handleSignOut}
      >
        Sign Out
      </MenuItem>
    </Menu>
  );
};
