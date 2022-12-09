import { useEffect } from "react";
import ChatRoom from "./ChatRoom";
import RoomList from "../components/RoomList";

const HomePage = () => {
    useEffect(() => {
        // connect()
        // getPosts();
    }, []);

    return (
        <div className="page">
            {/* <ChatRoom /> */}
            {/* <div></div> */}
            <RoomList/>
        </div>
    );
};

export default HomePage;
