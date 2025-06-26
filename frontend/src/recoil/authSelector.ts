import { selector } from "recoil";
import { authTokenState, userState } from "./authAtoms";

export const isAuthenticatedSelector = selector<boolean>({
    key: "isAuthenticatedSelector",
    get: ({ get }) => {
        const token = get(authTokenState);
        const user = get(userState);
        return !!token && !!user;
    },
});
