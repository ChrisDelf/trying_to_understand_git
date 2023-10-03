import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SyncTwoToneIcon from "@mui/icons-material/SyncTwoTone";
import { TextField } from "@mui/material";
import MenuBar from "../MenuBar";
import Button from "@mui/material/Button";
import { postSong } from "../userSlice";

import { Label } from "@mui/icons-material";
import { useDispatch } from "react-redux";

const DownloadList = () => {
  const [uploadLink, setUploadLink] = useState("");
  const dispatch = useDispatch();

  const onLinkChnage = (e) => setUploadLink(e.target.value);

  const [items, setItems] = useState([
    { id: 1, status: "finished" },
    { id: 2, status: "finished" },
    { id: 3, status: "unfinished" },
  ]);

  const onUploadClick = () => {
    let data = { link: uploadLink };
    dispatch(postSong(data));
  };

  return (
    <div className="download-list">
      <MenuBar />
      <div className="link-box">
        <h2>Link goes below! </h2>
        <TextField
          id="filled-basic"
          label="Filled"
          variant="filled"
          type="text"
          value={uploadLink}
          onChange={onLinkChnage}
        />
        <Button variant="contained" onClick={onUploadClick}>
          Upload
        </Button>
      </div>

      <List component="nav" aria-label="item list">
        {items.map((item, index) => (
          <ListItem key={index}>
            <ListItemText>
              {item.id}
              {item.status}
            </ListItemText>
            <SyncTwoToneIcon />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default DownloadList;
