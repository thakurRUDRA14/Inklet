import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import Quote from "../components/Quote";
import type { SigninInput } from "@thakurrudra/inklet-common";
import { useNavigate } from "react-router-dom";
import { useSigninUserMutation } from "../features/api/userApiSlice";
import { useSetRecoilState } from "recoil";
import { authTokenState, userState } from "../recoil/authAtoms";

const Signin = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<SigninInput>({
        username: "",
        password: "",
    });

    const [signinUser, { isLoading }] = useSigninUserMutation();
    const setToken = useSetRecoilState(authTokenState);
    const setUser = useSetRecoilState(userState);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const userData = await signinUser(formData).unwrap();
            localStorage.setItem("userToken", userData.userToken);
            setToken(userData.userToken);
            setUser(userData.user);
            alert("Login successful ✅");

            navigate("/blogs");
        } catch (err: any) {
            const message = err?.data?.message || err?.error || "Login failed. Please try again.";
            alert(message);
        }
    };

    return (
        <div className='lg:grid lg:grid-cols-2 h-screen'>
            <div>
                <AuthForm
                    type='signin'
                    formData={formData}
                    onInputChange={handleInputChange}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </div>
            <div className='hidden lg:block'>
                <Quote />
            </div>
        </div>
    );
};

export default Signin;
