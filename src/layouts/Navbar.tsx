import { useContext } from "react";
import { NavLink } from "react-router-dom";
import GlobalContext from "../scripts/globalContext";
import { signin } from "../scripts/pocketbase";
import "./Navbar.scss";

const Navbar = () => {
    const {
        set,
        get: { userData: {connected} },
        auth: { login, logout },
    } = useContext(GlobalContext);
    return (
        <div className="navbar">
            <div className="inner">
                <NavLink to={"/"}>Rooms</NavLink>
            </div>
            <div className="inner">
                {connected ? <>
                <NavLink to={"/User"}>User</NavLink>
                <button onClick={logout}>Déconnexion</button>
                </> : <>
                <NavLink to={"/SignIn"}>S'inscrire</NavLink>
                <NavLink to={"/Login"}>Login</NavLink>
                </>}
            </div>
            {/* <div className={"username"}>
                <input
                    defaultValue="Anonymous"
                    type={"text"}
                    onChange={(event) => {
                        set((old: any) => ({
                            ...old,
                            username: event.target.value,
                        }));
                    }}
                />
            </div> */}
        </div>
    );
};

export default Navbar;
