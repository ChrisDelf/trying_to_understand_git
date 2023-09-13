import { ThemeProvider } from "@mui/material";
import ReactAudioPlayer from "react-audio-player";

import mainTheme from "../../app/themes";

const AudioPlayer = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <ReactAudioPlayer src="http://localhost:3500/song/play/1" autoPlay controls />
    </ThemeProvider>
  );
};



export default AudioPlayer;
