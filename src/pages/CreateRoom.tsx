import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext, { initialType } from "../scripts/globalContext";
import { socket } from "../scripts/socketio";
import "./CreateRoom.scss";

interface form {
    roomname: string;
    isPublic: boolean;
}

const CreateRoom = () => {
    const {
        get: {
            userData: { username, userId },
        },
        set,
        auth: { login, logout },
    } = useContext(GlobalContext);

    const n = useNavigate();

    const [formData, setFormData]: [form, any] = useState({
        roomname: "",
        isPublic: true,
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        // event.preventDefault();
        const target: HTMLInputElement = event.target;
        const { value, id } = target;

        setFormData((old: form) => ({ ...old, [id]: value }));
    };
    const handleCheckChange = (event: ChangeEvent<HTMLInputElement>) => {
        // event.preventDefault();
        const target: HTMLInputElement = event.target;
        const { checked, id } = target;

        setFormData((old: form) => ({ ...old, [id]: checked }));
    };
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault(); // Empêche le rechargement de la page onSubmit des formulaires
        let newErrors: Array<string> = [];
        let hasError = false;

        if (formData.roomname.length > 4) {
        }

        if (hasError) {
            setErrors(newErrors);
        } else {
            // créer la room
            socket.emit(
                "createRoom",
                {
                    sessionData: {
                        name: formData.roomname,
                        owner: {
                            uid: userId || socket.id,
                            name: username,
                        },
                        messages: [],
                        users: [],
                        isPublic: formData.isPublic,
                    },
                    userData: {
                        uid: userId || socket.id,
                        name: username,
                        sid:socket.id
                    },
                },
                callback
            );
        }
    };

    const callback = ({ message, valid, newRoomId, newRoomName }: { message: string; valid: boolean, newRoomId:string, newRoomName:string }) => {
        if (valid) {
            set((oldValue: initialType) => ({
                ...oldValue,
                socketData: {
                    roomId: newRoomId,
                    roomName:newRoomName
                },
            }))
            n("/ChatRoom");
        } else {
            setErrors([message]);
        }
    };

    const [errors, setErrors]: [Array<string>, any] = useState([]);
    return (
        <div className="page createroom">
            <form onSubmit={handleSubmit}>
                <div className="error">
                    {errors.map((err, key) => (
                        <div key={key}> {err} </div>
                    ))}
                </div>
                <input
                    className="requiredValidation"
                    min={4}
                    max={12}
                    placeholder="Nom de la Room"
                    type="text"
                    id="roomname"
                    onInput={handleChange}
                />
                <label htmlFor="isPublic">Est-ce public ?</label>
                <input defaultChecked={true} type="checkbox" id="isPublic" onChange={handleCheckChange} />
                <input type="submit" />
            </form>
        </div>
    );
};

export default CreateRoom;
