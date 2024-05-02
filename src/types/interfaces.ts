export interface Note {
    user: string,
    noteId: string,
    title: string,
    text: string,
    createdAt: Date,
    modifiedAt: Date
};

export interface Account {
    userId: string,
    username: string,
    password: string,
    email: string,
}

export interface Login {
    username: string,
    password: string
}

export interface postNote {
    username: string,
    title: string,
    text: string
}
export interface jwtPayload {
    user: string
}