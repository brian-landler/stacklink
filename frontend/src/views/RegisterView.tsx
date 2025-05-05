import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { isAxiosError } from "axios"
import { toast } from "sonner"
import ErrorMessage from "../components/ErrorMessage"
import { PrimaryButtonForm } from '@/components/buttons'
import { RegisterForm } from "../types"
import api from "../config/axios"

export default function RegisterView() {
    const initialValues : RegisterForm = {
        name: '',
        email: '',
        handle: '',
        password: '',
        password_confirmation: ''
    }

    const { register, watch, handleSubmit, reset, formState: { errors } } = useForm({defaultValues: initialValues})

    const password = watch('password')

    const handleRegister = async (formData : RegisterForm) => {
        try {
            const { data } = await api.post(`/auth/register`, formData)
            toast.success(data)
            
            reset()
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response?.data.error)
            }
        }
    }

    return (
        <>
            <h1 className="text-3xl text-white text-center font-bold">
                Create account
            </h1>

            <form 
                onSubmit={handleSubmit(handleRegister)}
                className="bg-white rounded-2xl px-5 py-10 mt-10"
            >
                <div className="grid grid-cols-1 space-y-3 pb-5">
                    <label htmlFor="name" className="text-2xl text-brand-1">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Name"
                        className="bg-slate-200 border-none p-3 rounded-lg placeholder-brand-2"
                        {...register('name', {
                            required: "Name is required"
                        })}
                    />

                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </div>

                <div className="grid grid-cols-1 space-y-3 pb-5">
                    <label htmlFor="email" className="text-2xl text-brand-1">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="bg-slate-200 border-none p-3 rounded-lg placeholder-brand-2"
                        {...register('email', {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Invalid email",
                            },
                        })}
                    />

                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>

                <div className="grid grid-cols-1 space-y-3 pb-5">
                    <label htmlFor="handle" className="text-2xl text-brand-1">Handle</label>
                    <input
                        id="handle"
                        type="text"
                        placeholder="Username without spaces"
                        className="bg-slate-200 border-none p-3 rounded-lg placeholder-brand-2"
                        {...register('handle', {
                            required: "Handle field is required"
                        })}
                    />

                    {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
                </div>

                <div className="grid grid-cols-1 space-y-3 pb-5">
                    <label htmlFor="password" className="text-2xl text-brand-1">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="bg-slate-200 border-none p-3 rounded-lg placeholder-brand-2"
                        {...register('password', {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "The password must be at least 8 characters long"
                            }
                        })}
                    />

                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </div>

                <div className="grid grid-cols-1 space-y-3 pb-5">
                    <label htmlFor="password_confirmation" className="text-2xl text-brand-1">Repeat Password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Confirm Password"
                        className="bg-slate-200 border-none p-3 rounded-lg placeholder-brand-2"
                        {...register('password_confirmation', {
                            required: "This field is required",
                            validate: (value) => value === password || "Password does not match"
                        })}
                    />

                    {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
                </div>

                <PrimaryButtonForm>Register</PrimaryButtonForm>
            </form>

            <nav className="mt-5">
                <Link 
                    className="text-center text-white text-lg block"
                    to="/auth/login">Already have an account? Login here</Link>
            </nav>
        </>
    )
}