import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useRef, useState } from "react";
import GlobalContext from "../scripts/globalContext";
import { socket } from "../scripts/socketio";
import "./Sender.scss";

const Sender = () => {
    const [inputMessage, setInputMessage] = useState("");

    const {
        get: {
            userData: { username, userId },
            socketData: {
                roomId
            }
        },
    } = useContext(GlobalContext);

    const inputRef = useRef(null) as React.RefObject<HTMLInputElement>;

    const sendMessage = (e: any) => {
        e.preventDefault();
        if (inputRef.current) {
            inputRef.current.value = "";
        }
        setInputMessage("");
        inputMessage?.trim() && socket.emit("sendMessage", { value: inputMessage, name: username, uid: userId || socket.id, sessionId:roomId });
    };

    return (
        <form className="sender" onSubmit={sendMessage}>
            <input
                className="newMessage"
                ref={inputRef}
                type={"text"}
                onChange={(event) => {
                    setInputMessage(event.target.value);
                }}
            />
            <button> 
                <FontAwesomeIcon icon={faLocationArrow}/>
            </button>
        </form>
    );
};

export default Sender;