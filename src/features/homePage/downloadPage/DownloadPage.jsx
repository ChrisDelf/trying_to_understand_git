import React, { useEffect, useState } from "react";
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
import { io } from "socket.io-client";

const api = "http://localhost:3000"
const DownloadPage = () => {
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


useEffect(() => {
    const socket = io(api);

    socket.on("connect", () => {
      console.log("Connected to socket");
      socket.emit("chat message", "Hello from client!");
    });

    // socket.on("song-finished", (songData) => {
    //   handleJobUpdate(songData);
    // });

    // socket.on("unfinishedJobs", (jobs) => {
    //   setJobList(jobs);
    //   console.log(jobList);
    // });

    return () => {
      socket.disconnect();
    };
  }, []);

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

export default DownloadPage;
