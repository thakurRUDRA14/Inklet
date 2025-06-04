import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { authTokenState, userState } from "../recoil/authAtoms";
import axiosInstance from "../utils/axiosInstance";

export const useHydrateUser = () => {
    const setUser = useSetRecoilState(userState);
    const setAuthToken = useSetRecoilState(authTokenState);

    useEffect(() => {
        const token = localStorage.getItem("userToken");

        const fetchUser = async () => {
            if (token) {
                try {
                    const { data } = await axiosInstance.get("/user/me", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUser(data.user);
                    setAuthToken(token);
                } catch (error) {
                    console.log("Token invalid or expired");
                    localStorage.removeItem("userToken");
                    setUser(null);
                    setAuthToken(null);
                }
            }
        };

        fetchUser();
    }, [setUser, setAuthToken]);
};
