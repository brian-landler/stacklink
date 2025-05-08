import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { PrimaryButtonForm } from "@/components/buttons";
import ErrorMessage from "@/components/ErrorMessage";
import { ProfileForm, User } from "@/types";

export default function ProfileView() {
    // Retrieving cached user data
    const queryClient = useQueryClient()
    const data : User = queryClient.getQueryData(['user'])!

    const { register, handleSubmit, formState: {errors} } = useForm<ProfileForm>({defaultValues: {
        handle: data.handle,
        description: data.description
    }})

    const handleUserProfileForm = (formData: ProfileForm) => {
        console.log(formData)
    }

    return (
        <form 
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(handleUserProfileForm)}
        >
            <legend className="text-2xl text-slate-800 text-center">Edit profile</legend>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Handle</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Handle or username"
                    {...register('handle', {
                        required: 'Username is required'
                    })}
                />

                {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                >Description</label>
                <textarea
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Your description"
                    {...register('description')}
                />

                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="image"
                >Image</label>
                <input
                    id="image"
                    type="file"
                    name="image"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    accept="image/*"
                    onChange={ () => {} }
                />
            </div>

            <PrimaryButtonForm>Save changes</PrimaryButtonForm>
        </form>
    )
}