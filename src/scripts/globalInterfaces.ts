export interface MessageData {
    value: string;
    sender: User;
    timestamp: Date;
    id: string;
}

export interface SessionData {
    name: string;
    owner: User;
    messages: Array<MessageData>;
    users: Array<User>;
    isPublic: boolean;
}

export interface User {
    uid: string;
    name: string;
    sid: string;
}

export interface sessionList {
    [uid: string]: SessionData;
}

export interface MessageData {
    value: string;
    sender: User;
    timestamp: Date;
    id: string;
}
