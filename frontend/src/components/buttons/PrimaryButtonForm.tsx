type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
};

export function PrimaryButtonForm({children, ...props}: ButtonProps) {
    return (
        <button
            type="submit"
            className="bg-brand-3 hover:bg-brand-2 hover:transition-all hover:duration-300 h-10 w-full uppercase text-white rounded-lg font-semibold cursor-pointer"
            {...props}
        >
            {children}
        </button>
    )
}