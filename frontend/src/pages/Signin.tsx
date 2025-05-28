import React, { useState } from 'react'
import AuthForm from '../components/AuthForm'
import Quote from '../components/Quote'
import type { SigninInput } from '@thakurrudra/inklet-common'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../config'

const Signin = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<SigninInput>({
        username: "",
        password: "",
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await axios.post(`${BACKEND_URL}/user/signin`, formData)

            const token = response.data.token;
            localStorage.setItem('token', token)
            navigate('/blogs')
        } catch (error) {
            console.error('Signin failed:', error)
            // Handle error (show toast, etc.)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="lg:grid lg:grid-cols-2 h-screen">
            <div>
                <AuthForm
                    type="signin"
                    formData={formData}
                    onInputChange={handleInputChange}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </div>
            <div className="hidden lg:block"><Quote /></div>
        </div>
    )
}

export default Signin