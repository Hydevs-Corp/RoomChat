import React, { useContext, useId } from "react";
import { NavLink } from "react-router-dom";
import GlobalContext from "../scripts/globalContext";
import { sessionList } from "../scripts/globalInterfaces";
import { socket } from "../scripts/socketio";
import useFetch from "../scripts/useFetch";
import JoinRoomByName from "./JoinRoomByName";
import Room from "./Room";
import "./RoomList.scss";

const RoomList = () => {
    const { data, error } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/getRoomList`) as {
        data: sessionList | void;
        error: Error | void;
    };

    
    const {
        get: {
            userData: { username, userId },
        },
        auth: { login, logout },
    } = useContext(GlobalContext);

    return (
        <div className="roomlist">
            <JoinRoomByName/>
            <NavLink className={"createroom"} to="/CreateRoom">
                Créer une Room
            </NavLink>
            <h2>Liste des Rooms publiques</h2>
            {
            data
                ?
                    Object.keys(data).map((roomDataId, index) => {
                        return (data[roomDataId].isPublic || data[roomDataId].owner.uid === (userId || socket.id)) && <Room key={index} id={roomDataId} roomData={data[roomDataId]} />;
                    })
                : 
                    null
            }
        </div>
    );
};

export default RoomList;