import { useForm } from "react-hook-form";
import slugify from "react-slugify";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "./ErrorMessage";
import { PrimaryButtonForm } from "./buttons";
import { searchByHandle } from "@/api/StacklinkAPI";
import { Link } from "react-router-dom";
import SuccessMessage from "./SuccessMessage";

export default function SearchForm() {
    const { register, handleSubmit, watch, formState : { errors } } = useForm({
        defaultValues: {
            handle: ''
        }
    })

    const mutation = useMutation({
        mutationFn: searchByHandle
    })

    const handle = watch('handle')

    const handleSearch = () => {
        const slug = slugify(handle)
        mutation.mutate(slug)        
    }

    return (
        <form
            onSubmit={handleSubmit(handleSearch)}
            className="space-y-5">
            <div className="relative flex items-center bg-white px-2">
                <label
                htmlFor="handle"
                >stacklink.com/</label>
                <input
                type="text"
                id="handle"
                className="border-none bg-transparent p-2 focus:ring-0 flex-1"
                placeholder="elonmusk, zuck, jeffbezos"
                {...register("handle", {
                    required: "The handle is required",
                })}
                />

            </div>
            {errors.handle && (
                <ErrorMessage>{errors.handle.message}</ErrorMessage>
            )}

            <div>
                {mutation.isPending && <p className="text-center">Loading</p>}
                {mutation.error && <ErrorMessage>{mutation.error.message}</ErrorMessage>}
                {mutation.data && <SuccessMessage>
                    {mutation.data} go to <Link className="text-brand-3 border-b-1 border-brand-3 hover:text-brand-6 hover:border-brand-6 active:text-brand-6 active:border-brand-6 focus:text-brand-6 focus:border-brand-6" to={'/auth/register'} state={{handle: slugify(handle)}}>Register</Link>
                </SuccessMessage>
                }
            </div>

            <PrimaryButtonForm>
                Get my Stacklink
            </PrimaryButtonForm>
        </form>
    )
}