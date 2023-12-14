import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { IconButton, Portal, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";

const PopUpPlaylistO = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.5)",
  zIndex: 1000,
});

const PopUpContent = styled("div")({
  color: "red",
});

const PopUpPlaylistMenu = (props) => {
  const { setPlaylistM } = props;
  const handleClick = () => {
    setPlaylistM(false);
  };
  return (
    <Portal>
      <PopUpPlaylistO>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Toolbar
            sx={{
              backgroundColor: "Teal",
              width: " 40%",
              justifySelf: "Center",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              color="white"
              sx={{ flexGrow: 1 }}
            >
              Add To playlist
            </Typography>

            <Typography
              variant="h6"
              component="div"
              color="white"
              sx={{ flexGrow: 1 }}
            >
              Create A playlist
            </Typography>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={handleClick}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </Box>
      </PopUpPlaylistO>
    </Portal>
  );
};

export default PopUpPlaylistMenu;
