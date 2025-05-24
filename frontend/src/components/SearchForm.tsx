import { useForm } from "react-hook-form";
import slugify from "react-slugify";
import ErrorMessage from "./ErrorMessage";
import { PrimaryButtonForm } from "./buttons";

export default function SearchForm() {
    const { register, handleSubmit, watch, formState : { errors } } = useForm({
        defaultValues: {
            handle: ''
        }
    })

    const handle = watch('handle')

    const handleSearch = () => {
        const slug = slugify(handle)
        console.log(slug);
        
    }

    return (
        <form
            onSubmit={handleSubmit(handleSearch)}
            className="space-y-5">
            <div className="relative flex items-center  bg-white  px-2">
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

            <PrimaryButtonForm>
                Get my Stacklink
            </PrimaryButtonForm>
        </form>
    )
}