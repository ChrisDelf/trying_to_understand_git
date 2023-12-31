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
import ChatWindow from "../chatWindow/ChatWindow";

const api = "http://localhost:3000";

const DownloadPage = () => {
  const [uploadLink, setUploadLink] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [tempSocket, setTempSocket] = useState(null);

  const dispatch = useDispatch();
  const onLinkChange = (e) => setUploadLink(e.target.value);

  const [jobs, setJobs] = useState([])

  const onUploadClick = () => {
    
    let data = { link: uploadLink };
    dispatch(postSong(data));
    setUploadLink("")
    
  };

  useEffect(() => {
    const socket = io(api);
    setTempSocket(socket);
    socket.on("connect", () => {
      console.log("Connected to socket");
    });

    // socket.on("song-finished", (songData) => {
    //   handleJobUpdate(songData);
    // });

    socket.on("unfinished-jobs", (jobs) => {
      socket.emit("unfinished-jobs", jobs);
      setJobs(jobs);
    });

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  useEffect(() => {
    console.log("SOCKET TRIGGERED");
    // Listen for incoming messages from the server
    if (tempSocket) {
      tempSocket.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        tempSocket.on("song-finished", (newSong) => {
        console.log(newSong);
          // fetchJobs();
        });
      });
    }
  }, [tempSocket]);

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
          onChange={onLinkChange}
        />
        <Button variant="contained" onClick={onUploadClick}>
          Upload
        </Button>
      </div>

      <List component="nav" aria-label="item list">
        {jobs.map((item, index) => (
          <ListItem key={index}>
            <ListItemText>
              {item.id}
            {"      "}
              {item.link}
            </ListItemText>
            <SyncTwoToneIcon />
          </ListItem>
        ))}
      </List>
      <ChatWindow
        socket={tempSocket}
        messages={messages}
        setMessages={setMessages}
        inputText={inputText}
        setInputText={setInputText}
      />
    </div>
  );
};

export default DownloadPage;
