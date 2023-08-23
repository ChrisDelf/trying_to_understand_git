import { useSelector } from "react-redux";

const HomePage = () => {
    const userInfo = useSelector((state) => state.user);

    return (
        <section>
            <h2>Hello</h2>
            {userInfo && userInfo.name ? userInfo.name : "User's name not available"}
        </section>
    );
};

export default HomePage;

