import Message from "../components/Message";
import Sender from "../components/Sender";
import "./ChatRoom.scss";
import useMessageList from "../scripts/useMessageList";
import GlobalContext from "../scripts/globalContext";
import { ReactHTMLElement, RefObject, useContext, useEffect, useRef } from "react";
import { socket } from "../scripts/socketio";
import { useNavigate } from "react-router-dom";

const ChatRoom = () => {
    const {
        get: {
            userData: { userId, username },
            socketData: { roomId, roomName },
        },
    } = useContext(GlobalContext);

    const n = useNavigate();

    useEffect(() => {
        if (roomId === "") {
            n("/");
        }
    }, [roomId]);

    const dummy: RefObject<HTMLInputElement> = useRef(null);

    const session = useMessageList(roomId, { uid: userId || socket.id, name: username, sid: socket.id }, dummy);

    console.log("sss", session?.messages)

    let prevAuthor = 'default';
    return (
        <div className="page chatroompage">
            <div className="chatroom">
                <h2>{session?.name} ({session?.users?.length})</h2>
                <div className="messageList" ref={dummy}>
                    {session?.messages?.map((messageData, key) => {
                        let truePrevAuthor:string = prevAuthor;
                        prevAuthor = messageData?.sender?.uid
                        return(
                        <Message prevAuthor={truePrevAuthor} key={key} messageData={messageData} />
                    )})}
                </div>
                <Sender />
            </div>
        </div>
    );
};

export default ChatRoom;
