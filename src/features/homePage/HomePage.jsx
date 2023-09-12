import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs, selectUser } from "./userSlice";
import MusicList from "./MusicList";
import { ThemeProvider } from "@mui/material";
import mainTheme from "../../app/themes";
import AudioPlayer from "./AudioPlayer";

const HomePage = () => {
    const dispatch = useDispatch();

    const userStatus = useSelector(selectUser);
    
    useEffect(() =>
        {
            // console.log(userStatus)
            // if(userStatus == 'idle')
            // {
            
            dispatch(fetchSongs())
            // }

        },[])
    const userInfo = useSelector((state) => state.user);

    return (

    <ThemeProvider theme={mainTheme}>
        <section>
            <h2>Hello</h2>
            {userInfo && userInfo.name ? userInfo.name : "User's name not available"}
            <h2>Recent Music</h2>
            <MusicList songs={userInfo.songs}/>
        </section>
        <AudioPlayer />
        </ThemeProvider>
    );
};

export default HomePage;

