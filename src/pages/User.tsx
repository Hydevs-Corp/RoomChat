import { useContext, useId } from "react";
import GlobalContext from "../scripts/globalContext";

const User = () => {
    const {
        get: {
            userData: { username, userId },
        },
        auth: { logout },
    } = useContext(GlobalContext);
    return (
        <div className="page user">
            Nom d'utilisateur : {username}
        </div>
    );
};

export default User;
