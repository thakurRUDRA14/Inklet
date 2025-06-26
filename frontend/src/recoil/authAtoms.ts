import { atom } from "recoil";
import type { User } from "../types/user";

const getLocalStorageItem = <T>(key: string): T | null => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error(`Error reading ${key} from localStorage:`, error);
        return null;
    }
};

export const authTokenState = atom<string | null>({
    key: "authToken",
    default: getLocalStorageItem<string>("userToken"),
    effects_UNSTABLE: [
        ({ onSet, setSelf }) => {
            const storedToken = getLocalStorageItem<string>("userToken");
            if (storedToken) setSelf(storedToken);

            onSet((newToken, _, isReset) => {
                if (newToken && !isReset) {
                    localStorage.setItem("userToken", newToken);
                } else {
                    localStorage.removeItem("userToken");
                }
            });
        },
    ],
});

export const userState = atom<User | null>({
    key: "userState",
    default: getLocalStorageItem<User>("user"),
    effects_UNSTABLE: [
        ({ onSet, setSelf }) => {
            const storedUser = getLocalStorageItem<User>("user");
            if (storedUser) setSelf(storedUser);

            onSet((newUser, _, isReset) => {
                if (newUser && !isReset) {
                    localStorage.setItem("user", JSON.stringify(newUser));
                } else {
                    localStorage.removeItem("user");
                }
            });
        },
    ],
});
