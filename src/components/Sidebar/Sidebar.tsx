import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { Avatar, IconButton } from "@mui/material";
import { useState } from "react";
import { MenuComponent } from "../Menu/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";
import "./sidebar.css";
import { SidebarProps } from "../Interfaces";

const Sidebar = ({ handleSignOut }: SidebarProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [user] = useAuthState(auth);
  const firstName = user?.displayName?.split(" ")[0];
  const navigate = useNavigate();

  const backFunction = () => {
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="user_info">
        <div className="back_arrow">
          <IconButton
            sx={{
              fontSize: "1.5rem",
              marginLeft: "1rem",
              position: "absolute",
              left: "1px",
              top: "10px",
              cursor: "pointer",
              color: "white",
            }}
            onClick={backFunction}
          >
            <ArrowBackIcon />
          </IconButton>
        </div>
        <IconButton onClick={handleClick} className="user_image">
          <Avatar
            src={user?.photoURL ?? ""}
            alt={firstName}
            sx={{ height: "50px", width: "50px" }}
            className="avatar_image"
          />
          <MenuComponent
            anchorEl={anchorEl}
            onClose={handleClose}
            handleSignOut={handleSignOut}
          />
        </IconButton>
        <h3>{firstName}</h3>
      </div>
    </div>
  );
};

export default Sidebar;
