import type { SignupInput } from "@thakurrudra/inklet-common";
import AuthForm from "../components/AuthForm";
import Quote from "../components/Quote";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<SignupInput>({
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        setIsLoading(true);

        try {
            const response = await axiosInstance.post("/user/signup", formData);
            const token = response.data.jwt;
            localStorage.setItem("token", token);
            navigate("/blogs");
        } catch (error) {
            console.error("Signin failed:", error);
            // Handle error (show toast, etc.)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='lg:grid lg:grid-cols-2 h-screen'>
            <div>
                <AuthForm
                    type='signup'
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

export default Signup;
