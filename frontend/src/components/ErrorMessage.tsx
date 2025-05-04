type ErrorMessageProps = {
    children: React.ReactNode
}

export default function ErrorMessage({children}: ErrorMessageProps) {
    return (
        <p className="text-sm text-red-700 bg-red-50 p-2 font-medium">{children}</p>
    )
}