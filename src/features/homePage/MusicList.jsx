import { useEffect, useState } from "react";
import { FixedSizeList } from "react-window";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { ThemeProvider } from "@mui/material";
import PropTypes from "prop-types"; // Import PropTypes
import mainTheme from "../../app/themes";
import { setSelectedSong } from "./userSlice";
import { FileDownload } from "@mui/icons-material";

const MusicList = (props) => {
  const { songs, setRerender, rerender } = props;

  const dispatch = useDispatch();
  const handleOnPlayClick = (index) => {
    let tempSong = {
      src: songs[index].id,
      title: songs[index].name,
      index: index,
    };
    dispatch(setSelectedSong(tempSong));
    // setRerender(!rerender)
  };

  const handleOnDownloadClick = (index) =>
    {}

  return (
    <ThemeProvider theme={mainTheme}>
      <FixedSizeList
        height={400}
        width={360}
        itemSize={43}
        itemCount={songs.length}
        overscanCount={5}
      >
        {({ index, style }) => (
          <div style={style}>
            <ListItem
              key={index}
              color="primary"
              secondaryAction={
                <>
                  <IconButton
                    aria-label="comment"
                    onClick={() => {
                      handleOnPlayClick(index);
                    }}
                  >
                    <PlayCircleIcon color="primary" />
                  </IconButton>
                  <IconButton aria-label="comment" onClick={() => {handleOnDownloadClick(index)}}>
                    <FileDownload color="primary" />
                  </IconButton>
                </>
              }
            >
              <ListItemText primary={`${songs[index].name}`} />
            </ListItem>
          </div>
        )}
      </FixedSizeList>
    </ThemeProvider>
  );
};
// Define propTypes for MusicList
MusicList.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.object).isRequired, // Define the prop type for 'songs'
  rerender: PropTypes.bool,
  setRerender: PropTypes.func,
  // onClickSelectSong: PropTypes.func.isRequired
};

export default MusicList;
