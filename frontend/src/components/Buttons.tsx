type ErrorMessageProps = {
    children: string
}

export function PrimaryButtonForm({children}: ErrorMessageProps) {
    return (
        <input
            type="submit"
            className="bg-brand-3 border-2 border-brand-3 hover:bg-brand-5 hover:text-brand-1 p-3 text-lg w-full uppercase text-white rounded-lg font-bold cursor-pointer"
            value={children}
        />
    )
}