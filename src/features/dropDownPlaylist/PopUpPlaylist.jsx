import React, { useState } from "react";
import { styled } from "@mui/material/styles";
const PopUpPlaylistO = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
});

const PopUpContent = styled("div")({
  color: "red",
});

const PopUpPlaylist = (props) => {
  const { setPlaylistM } = props;

  return (
    <PopUpPlaylist>
      <PopUpContent>
        <h> DERRREp </h>
        <h> GREETINGS </h>
      </PopUpContent>
    </PopUpPlaylist>
  );
};

export default PopUpPlaylist;
