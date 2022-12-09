import { Record, RecordAuthResponse } from "pocketbase";
import { createContext } from "react";
import { login, logout } from "./pocketbase";

export type initialType = {
    userData: {
        username: string;
        userId: string;
        connected: boolean;
    };
    socketData: {
        isConnected: boolean;
        roomId: string;
        roomName: string;
    };
};

export const initialValue: initialType = {
    userData: {
        username: "Anonymous",
        userId: "",
        connected: false,   // is connecté avec un compte pocketbase
    },
    socketData: {
        isConnected: false, // is Connecté au backend
        roomId: "",
        roomName: ""
    },
};

const salut = (_: string) => {
    [""].filter((_, id) => {
        return id
    })
}

const initialContextValue = {
    set: (_: any) => {},
    get: initialValue,
    auth: {
        login: login,
        logout: logout,
    },
};

const GlobalContext = createContext(initialContextValue);

export default GlobalContext;
