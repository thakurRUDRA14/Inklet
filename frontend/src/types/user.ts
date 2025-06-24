import type { UpdatePassword as Password } from "@thakurrudra/inklet-common";

export interface User {
    id: string;
    name: string;
    username: string;
    createdAt: string;
    updatedAt: string;
}

export interface UpdatePassword extends Password {
    oldPassword: string;
    newPassword: string;
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
