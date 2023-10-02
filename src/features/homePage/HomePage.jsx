import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs, selectUser, setStatus } from "./userSlice";
import MusicList from "./MusicList";
import { Button, ThemeProvider, setRef } from "@mui/material";
import mainTheme from "../../app/themes";
import AudioPlayer from "./AudioPlayer";
import MenuBar from "./MenuBar";

// Here lives the primary state for the audio Object
const audio = new Audio();

const HomePage = () => {
  const [rerender, setRerender] = useState(true);
  const audioMain = audio;
  const dispatch = useDispatch();

  const userStatus = useSelector(selectUser);

  const onStatusClick = () => {
    dispatch(setStatus("idle"));
  };

  useEffect(() => {
    // console.log(userStatus)
    if (userStatus == "idle") {
      dispatch(fetchSongs());
    }
  }, [userStatus]);
  const userInfo = useSelector((state) => state.user);

  return (
    <>
      <MenuBar />
      <section>
        <h2>Hello</h2>
        {userInfo && userInfo.name
          ? userInfo.name
          : "User's name not available"}
        <h2>Recent Music</h2>
        <Button onClick={onStatusClick} variant="contained" color="primary">
          refresh
        </Button>
        <MusicList songs={userInfo.songs} rerender={rerender} setRerender={setRerender} />
      </section>
      <AudioPlayer tracks={userInfo.songs} audio={audioMain} rerender={rerender} />
    </>
  );
};

export default HomePage;
