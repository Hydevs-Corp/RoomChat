import { Record, RecordAuthResponse } from "pocketbase";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./layouts/Navbar";
import ChatRoom from "./pages/ChatRoom";
import CreateRoom from "./pages/CreateRoom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import User from "./pages/User";
import GlobalContext, { initialType, initialValue } from "./scripts/globalContext";
import { login, logout, pb } from "./scripts/pocketbase";
import { socket } from "./scripts/socketio";

function App() {
    const [contextValue, setContextValue]: [initialType, any] = useState(initialValue);

    const useLogin = async (email: string, password: string) => {
        const { authData, error } = await login(email, password);
        if (!error) {
            setContextValue((old: initialType) => ({
                ...old,
                userData: {
                    username: authData?.record?.username,
                    userId: pb.authStore?.model?.id,
                    connected: true,
                },
            }));
            return { authData, error: null };
        } else {
            return { authData: undefined, error };
        }
    };

    const useLogout = () => {
        logout();
        setContextValue((old: initialType) => ({
            ...old,
            userData: initialValue.userData,
        }));
    };

    const context = {
        set: setContextValue,
        get: contextValue,
        auth: {
            login: useLogin,
            logout: useLogout,
        },
    };

    useEffect(() => {
        if (pb.authStore.isValid) {
            setContextValue((old: initialType) => ({
                ...old,
                userData: {
                    username: pb.authStore?.model?.username,
                    userId: pb.authStore?.model?.id,
                    connected: true,
                },
            }));
        }
    }, []);
    socket.emit("linkSocket", pb.authStore?.model?.id || socket.id);

    return (
        <div className="App">
            <GlobalContext.Provider value={context}>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/SignIn" element={<SignIn />} />
                        <Route
                            path="/User"
                            element={contextValue.userData.connected ? <User /> : <Navigate to={"/Login"} />}
                        />
                        <Route path="/Login" element={<Login />} />
                        <Route path="/ChatRoom" element={<ChatRoom />} />
                        <Route path="/CreateRoom" element={<CreateRoom />} />
                    </Routes>
                </BrowserRouter>
            </GlobalContext.Provider>
        </div>
    );
}
// Hello bro !
export default App;