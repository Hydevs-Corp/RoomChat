import { ChangeEvent, FormEvent, useContext, useState } from "react";
import GlobalContext from "../scripts/globalContext";
import { signin, signinType } from "../scripts/pocketbase";
import "./SignIn.scss";

const SignIn = () => {
    const {
        set,
        auth: { login, logout },
    } = useContext(GlobalContext);

    const [formData, setFormData]: [signinType, any] = useState({
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
        username: "",
    });
    const [errors, setErrors]: [Array<string>, any] = useState([]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const target: HTMLInputElement = event.target;
        const { value, id } = target;

        setFormData((old: signinType) => ({ ...old, [id]: value }));
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        let newErrors = [];
        let hasError = false;
        if (formData.email !== formData.confirmEmail) {
            newErrors.push("Les emails ne correspondent pas");
            hasError = true;
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.push("Les mots de passe ne correspondent pas");
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
        } else {
            logout();
            signin(formData);
            login(formData.email, formData.password);
        }
    };

    return (
        <div className="page signin">
            <form onSubmit={handleSubmit}>
                <div className="error">
                    {errors.map((err, key) => (
                        <div key={key}> {err} </div>
                    ))}
                </div>
                <input
                    className="requiredValidation"
                    placeholder="Nom d'utilisateur"
                    minLength={1}
                    maxLength={20}
                    type="text"
                    id="username"
                    onInput={handleChange}
                    required
                />
                <input
                    className="requiredValidation"
                    placeholder="Email"
                    type="email"
                    id="email"
                    onInput={handleChange}
                    required
                />
                <input
                    className="requiredValidation"
                    placeholder="Confirmer l'email"
                    type="email"
                    id="confirmEmail"
                    onInput={handleChange}
                    required
                />
                <input
                    className="requiredValidation"
                    placeholder="Mot de passe"
                    minLength={8}
                    maxLength={20}
                    type="password"
                    id="password"
                    onInput={handleChange}
                    required
                />
                <input
                    placeholder="Confirmer le mot de passe"
                    type="password"
                    id="confirmPassword"
                    onInput={handleChange}
                />
                <input type="submit" />
            </form>
        </div>
    );
};

export default SignIn;
