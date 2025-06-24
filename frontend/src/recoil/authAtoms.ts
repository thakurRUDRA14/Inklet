import { atom } from "recoil";
import type { User } from "../types/user";

export const authTokenState = atom<string | null>({
    key: "authToken",
    default: localStorage.getItem("userToken"),
    effects_UNSTABLE: [
        ({ onSet }) => {
            onSet((token) => {
                if (token) localStorage.setItem("userToken", token);
                else localStorage.removeItem("userToken");
            });
        },
    ],
});

export const userState = atom<User | null>({
    key: "userState",
    default: null,
    effects_UNSTABLE: [
        ({ onSet }) => {
            onSet((user) => {
                if (user) localStorage.setItem("user", JSON.stringify(user));
                else localStorage.removeItem("user");
            });
        },
    ],
});
