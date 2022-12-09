import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { MessageData } from "../scripts/globalInterfaces";
import { socket } from "../scripts/socketio";
import GlobalContext from "../scripts/globalContext";

import "./Message.scss";

interface props {
    messageData: MessageData;
    prevAuthor: string
}

const Message = ({
    messageData: {
        value,
        timestamp,
        id,
        sender: { uid, name },
    },
    prevAuthor
}: props) => {
    const {
        get: {
            userData: { userId },
            socketData: {
                roomId
            }
        },
    } = useContext(GlobalContext);

    let isAuthor = (userId || socket.id) === uid;

    let className = `message ${isAuthor ? "mine" : ""}`;

    const parseTimestamp = (t: Date) => {
        let timestamp = new Date(t);
        let hours = timestamp.getHours() + "";
        hours = hours.length === 2 ? hours : "0" + hours;
        let minutes = timestamp.getMinutes() + "";
        minutes = minutes.length === 2 ? minutes : "0" + minutes;

        return `${hours}:${minutes}`;
    };

    const deleteMessage = () => {
        socket.emit("deleteMessage", id, roomId);
    };

    return (
        <div className={className} tabIndex={100}>
            {prevAuthor !== uid ? <div className="author">{name}</div> : null}
            <div className="value">{value}</div>
            <div className="timestamp">{parseTimestamp(timestamp)}</div>
            {isAuthor && (
                <button onClick={deleteMessage} className="delete">
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            )}
        </div>
    );
};

export default Message;
