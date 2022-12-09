import React, { FormEventHandler, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalContext, { initialType } from '../scripts/globalContext';
import { socket } from '../scripts/socketio';
import './JoinRoomByName.scss';

const JoinRoomByName = () => {
    const [state, setState] = useState("") as [string, any];
    const [result, setResult] = useState("") as [string, any];
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
        setResult(message);

    };

    const joinRoom: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        socket.emit(
            "JoinRoomByName",
            {
                name: state,
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
        <form className='JoinRoomByName' onSubmit={joinRoom}>
            {result}
            
            <h2>Rejoindre une Room avec son nom</h2>
            <input type="text" onChange={(e) => setState(e.target.value)} />
            <input type="submit" value="Rejoindre" />
        </form>
    );
};

export default JoinRoomByName;