import { PrimaryButtonForm } from "@/components/buttons";


export default function ProfileView() {

    return (
        <form 
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={() => {}}
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
                />
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                >Description</label>
                <textarea
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Your description"
                />
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