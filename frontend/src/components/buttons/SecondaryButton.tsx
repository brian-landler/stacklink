type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
};

export function SecondaryButton({children, ...props}: ButtonProps) {
    return (
        <button
            onClick={() => {}}
            className="bg-brand-6 border-2 border-brand-6 text-brand-1 hover:bg-brand-1 hover:text-brand-6 hover:transition-all hover:duration-300 p-2 h-10 text-xs min-w-32 uppercase rounded-lg font-bold cursor-pointer"
            {...props}
        >
            {children}
        </button>
    )
}