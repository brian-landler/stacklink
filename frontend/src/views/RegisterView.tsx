import { Link, useLocation } from "react-router-dom"
import { useForm } from "react-hook-form"
import { isAxiosError } from "axios"
import { toast } from "sonner"
import ErrorMessage from "../components/ErrorMessage"
import { PrimaryButtonForm } from '@/components/buttons'
import { RegisterForm } from "../types"
import api from "../config/axios"

export default function RegisterView() {
    const location = useLocation()

    const initialValues : RegisterForm = {
        name: '',
        email: '',
        handle: location.state.handle || '',
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
            <h1 className="text-3xl text-center font-bold">
                Create account
            </h1>

            <form 
                onSubmit={handleSubmit(handleRegister)}
                className="bg-white rounded-2xl px-5 py-10 mt-10"
            >
                <div className="grid grid-cols-1 space-y-3 pb-5">
                    <label htmlFor="name" className="text-2xl">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Name"
                        className="bg-slate-200 border-none p-2 rounded-lg placeholder-slate-800"
                        {...register('name', {
                            required: "Name is required"
                        })}
                    />

                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </div>

                <div className="grid grid-cols-1 space-y-3 pb-5">
                    <label htmlFor="email" className="text-2xl">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="bg-slate-200 border-none p-2 rounded-lg placeholder-slate-800"
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
                    <label htmlFor="handle" className="text-2xl">Handle</label>
                    <input
                        id="handle"
                        type="text"
                        placeholder="Username without spaces"
                        className="bg-slate-200 border-none p-2 rounded-lg placeholder-slate-800"
                        {...register('handle', {
                            required: "Handle field is required"
                        })}
                    />

                    {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
                </div>

                <div className="grid grid-cols-1 space-y-3 pb-5">
                    <label htmlFor="password" className="text-2xl">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="bg-slate-200 border-none p-2 rounded-lg placeholder-slate-800"
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
                    <label htmlFor="password_confirmation" className="text-2xl">Repeat Password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Confirm Password"
                        className="bg-slate-200 border-none p-2 rounded-lg placeholder-slate-800"
                        {...register('password_confirmation', {
                            required: "This field is required",
                            validate: (value) => value === password || "Password does not match"
                        })}
                    />

                    {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
                </div>

                <PrimaryButtonForm>Register</PrimaryButtonForm>
            </form>

            <nav className="mt-10 inline-flex gap-2 text-lg text-center justify-center w-full">
                <span>
                    Already have an account?
                </span>

                <Link 
                    className="text-center block text-brand-3 border-b-1 border-brand-3 hover:text-brand-6 hover:border-brand-6 active:text-brand-6 active:border-brand-6 focus:text-brand-6 focus:border-brand-6"
                    to="/auth/login">Login here</Link>
            </nav>
        </>
    )
}