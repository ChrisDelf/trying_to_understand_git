import { FixedSizeList } from "react-window";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { ThemeProvider } from "@mui/material";
import PropTypes from "prop-types"; // Import PropTypes
import mainTheme from "../../app/themes";

const renderRow = (props) => {
  {
    const { name, index } = props;

    return (
      <div>
        <ListItem
          key={index}
          disableGutter
          color="primary"
          secondaryAction={
            <IconButton aria-label="comment">
              <PlayCircleIcon color="primary" />
            </IconButton>
          }
        >
          <ListItemText primary={`${name}`} />
        </ListItem>
      </div>
    );
  }
};

const MusicList = (props) => {
  const { songs } = props;

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
            {renderRow({ name: songs[index].name, index })}
          </div>
        )}
      </FixedSizeList>
    </ThemeProvider>
  );
};
// Define propTypes for MusicList
MusicList.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.object).isRequired, // Define the prop type for 'songs'
};

export default MusicList;
