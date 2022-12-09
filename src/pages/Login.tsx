import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../scripts/globalContext";
import "./Login.scss";

interface form {
    email: string;
    password: string;
}

const Login = () => {
    const {
        get: {
            userData: { username, userId },
        },
        auth: { login, logout },
    } = useContext(GlobalContext);

    const n = useNavigate();

    const [formData, setFormData]: [form, any] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const target: HTMLInputElement = event.target;
        const { value, id } = target;

        setFormData((old: form) => ({ ...old, [id]: value }));
    };
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault(); // Empêche le rechargement de la page onSubmit des formulaires
        let newErrors: Array<string> = [];
        let hasError = false;

        if (hasError) {
            setErrors(newErrors);
        } else {
            logout();
            const { error } = await login(formData.email, formData.password);
            if (error) {
                newErrors.push(error);
                setErrors(newErrors);
            } else {
                n("/User");
            }
        }
    };
    const [errors, setErrors]: [Array<string>, any] = useState([]);
    return (
        <div className="page login">
            <form onSubmit={handleSubmit}>
                <div className="error">
                    {errors.map((err, key) => (
                        <div key={key}> {err} </div>
                    ))}
                </div>
                <input placeholder="Email" type="email" id="email" onInput={handleChange} />
                <input placeholder="Mot de passe" type="password" id="password" onInput={handleChange} />
                <input type="submit" />
            </form>
        </div>
    );
};

export default Login;
