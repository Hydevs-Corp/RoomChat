import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext, { initialType } from "../scripts/globalContext";
import { SessionData } from "../scripts/globalInterfaces";
import { socket } from "../scripts/socketio";
import "./Room.scss";

interface props {
    roomData: SessionData;
    id: string;
}

const Room = ({ roomData: { name, owner, messages, users, isPublic }, id }: props) => {
    const [result, setResult] = useState("");
    const navigate = useNavigate();

    const {
        get: {
            userData: { username, userId },
        },
        set,
    } = useContext(GlobalContext);

    const callback = ({ message, valid, newRoomId, newRoomName }: { message: string; valid: boolean, newRoomId:string, newRoomName:string }) => {
        // mettre le message à l'écran
        if (valid && newRoomId) {
            setResult(message);
            set((oldValue: initialType) => ({
                ...oldValue,
                socketData: {
                    roomId: newRoomId,
                    roomName: name
                },
            }))
            navigate("/ChatRoom");
        }
    };

    const joinRoom = () => {
        socket.emit(
            "IWannaJoinThisRoom",
            {
                roomId: id,
                userData: {
                    uid: userId || socket.id,
                    name: username,
                    sid: socket.id
                },
            },
            callback
        );
    };

    return (
        <div className="room">
            <div className="message">{result}</div>
            <div className="name">{name}</div>
            <div className="owner">Créé par {owner.name}</div>
            <div className="userCount">
                {users.length} utilisateur{users.length > 1 ? "s" : ""} connecté{users.length > 1 ? "s" : ""}
            </div>
            <button onClick={joinRoom}>Rejoindre la room</button>
        </div>
    );
};

export default Room;
