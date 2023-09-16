import { ThemeProvider } from "@mui/material";
import ReactAudioPlayer from "react-audio-player";

import mainTheme from "../../app/themes";

const AudioPlayer = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <ReactAudioPlayer src="derp" autoPlay controls />
    </ThemeProvider>
  );
};



export default AudioPlayer;
