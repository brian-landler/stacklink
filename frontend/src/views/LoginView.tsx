import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import ErrorMessage from "../components/ErrorMessage"
import { PrimaryButtonForm } from "../components/buttons/PrimaryButtonForm"
import { LoginForm } from "../types"
import api from "../config/axios"
import { toast } from "sonner"
import { isAxiosError } from "axios"

export default function LoginView() {
    const initialValues : LoginForm = {
        email: '',
        password: '',
    }

    const { register, handleSubmit, formState: {errors} } = useForm({defaultValues: initialValues})

    const handleLogin = async (formData : LoginForm) => {
        try {
            const { data } = await api.post(`/auth/login`, formData)
            localStorage.setItem('AUTH_TOKEN', data) // Saving authentication token in localStorage due to simplicity
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response?.data.error)
            }
        }
    }

    return (
        <>
            <h1 className="text-3xl text-center font-bold">
                Log in
            </h1>

            <form 
                onSubmit={handleSubmit(handleLogin)}
                className="bg-white px-5 py-10 rounded-lg mt-10"
                noValidate
            >
                <div className="grid grid-cols-1 space-y-3 pb-5">
                    <label htmlFor="email" className="text-2xl text-color-brand-1">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="bg-slate-300 border-none p-2 rounded-lg placeholder-brand-1"
                        {...register("email", {
                            required: "Please enter your email",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <div className="grid grid-cols-1 space-y-3 pb-5">
                    <label htmlFor="password" className="text-2xl text-color-brand-1">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="bg-slate-300 border-none p-2 rounded-lg placeholder-brand-1"
                        {...register("password", {
                            required: "Please enter your password",
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <PrimaryButtonForm>Log In</PrimaryButtonForm>
            </form>

            <nav className="mt-10">
                <Link
                    className="text-center text-lg block" 
                    to="/auth/register">Don't have an account? Register here</Link>
            </nav>
        </>
    )
}