import type { SignupInput } from "@thakurrudra/inklet-common";
import AuthForm from "../components/AuthForm";
import Quote from "../components/Quote";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignupUserMutation } from "../features/api/userApiSlice";
import { useSetRecoilState } from "recoil";
import { authTokenState, userState } from "../recoil/authAtoms";

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<SignupInput>({
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [signupUser, { isLoading }] = useSignupUserMutation();
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

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            const userData = await signupUser(formData).unwrap();
            localStorage.setItem("userToken", userData.userToken);
            setToken(userData.userToken);
            setUser(userData.user);
            navigate("/blogs");
        } catch (err: any) {
            const message = err?.data?.message || err?.error || "Signup failed. Please try again.";
            alert(message);
        }
    };

    return (
        <div className='lg:flex h-[calc(100vh-3.6rem)]'>
            <div className='h-full lg:w-1/2'>
                <AuthForm
                    type='signup'
                    formData={formData}
                    onInputChange={handleInputChange}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </div>
            <div className='hidden lg:block h-full w-1/2'>
                <Quote />
            </div>
        </div>
    );
};

export default Signup;
