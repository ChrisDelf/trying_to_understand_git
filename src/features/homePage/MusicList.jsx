import { FixedSizeList } from "react-window";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { ThemeProvider } from "@mui/material";
import mainTheme from "../../app/themes";

const renderRow = (props) => {
  {
    const { name, index, theme } = props;

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
          <ListItemText primary={`Line item ${index}`} />
        </ListItem>
      </div>
    );
  }
};

const MusicList = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <FixedSizeList
        height={400}
        width={360}
        itemSize={43}
        itemCount={3}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </ThemeProvider>
  );
};

export default MusicList;
