import { RefObject, useEffect, useState } from "react";
import { MessageData, SessionData, User } from "./globalInterfaces";
import { socket } from "./socketio";

const useMessageList = (roomId: string, userData: User, dummy:RefObject<HTMLInputElement>): SessionData | void => {
    const [sessionData, setSessionData]: [SessionData | void, any] = useState(undefined);
    const listener = (session: SessionData) => {
        setSessionData(session);
        if (dummy !== null && dummy.current !== null) {
            dummy.current.scrollTo({ behavior: 'smooth', top:dummy.current.scrollHeight+200 });
        }
    };
    useEffect(() => {
        socket.on("message", listener);
        roomId && socket.emit("giveMeMessageList", roomId, listener);
        return () => {
            socket.off("message", listener);
            socket.emit("IWannaLeaveThisRoom", { roomId: roomId, userData: userData });
        };
    }, []);
    if (sessionData !== undefined) return sessionData;
    return undefined;
};

export default useMessageList;
