type ErrorMessageProps = {
    children: React.ReactNode
}

export default function SuccessMessage({children}: ErrorMessageProps) {
    return (
        <p className="text-sm text-green-700 bg-green-50 p-2 font-medium">{children}</p>
    )
}