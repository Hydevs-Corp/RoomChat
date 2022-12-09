import PocketBase, { Record, RecordAuthResponse } from "pocketbase";

// unsafe mod
export const pb = new PocketBase("https://louisrvl.fr/pocketbase/");

interface PromiseReturn {
    authData: RecordAuthResponse<Record> | void;
    error: string | null;
}

export const login = (email: string, password: string) =>
    new Promise<PromiseReturn>(async (resolve, reject) => {
        let authData: RecordAuthResponse<Record> | void;
        authData = await pb
            .collection("users")
            .authWithPassword(email, password)
            .catch((reason) => {
                resolve({ authData: undefined, error: "Email ou mot de passe incorrect" });
            });

        resolve({ authData, error: null });
    });

export const logout = () => {
    pb.authStore.clear();
};

export interface signinType {
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    username: string;
}

export const signin = async ({ username, email, password }: signinType) => {
    const data = {
        username,
        email,
        emailVisibility: false,
        password,
        passwordConfirm: password,
    };

    const record = await pb.collection("users").create(data);
};

// export const getPosts = async () => {
//     // const salut = await pb.collection("profiles").getFullList();
//     console.log(await pb.collection("users").listAuthMethods());
//     // console.log(salut)
// };
