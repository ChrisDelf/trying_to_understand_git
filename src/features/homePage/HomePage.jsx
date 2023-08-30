import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs, selectUser } from "./userSlice";

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
        <section>
            <h2>Hello</h2>
            {userInfo && userInfo.name ? userInfo.name : "User's name not available"}
        </section>
    );
};

export default HomePage;

