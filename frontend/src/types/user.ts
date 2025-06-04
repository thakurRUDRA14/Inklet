export interface User {
    id: string;
    name: string;
    username: string;
    createdAt: string;
    updatedAt: string;
}
export interface authResponse {
    user: User;
    userToken: string;
    expiresIn: string;
}

export interface ApiError {
    status: number;
    data: {
        message: string;
    };
}
