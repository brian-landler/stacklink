type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
};

export function PrimaryButton({children, ...props}: ButtonProps) {
    return (
        <button
            onClick={() => {}}
            className="bg-brand-3 hover:bg-brand-2 hover:transition-all hover:duration-300 w-30 uppercase h-10 text-white rounded-lg font-bold text-xs cursor-pointer"
            {...props}
        >
            {children}
        </button>
    )
}