import { JSX } from 'preact';

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    children: any;
    disabled?: boolean;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
    const base = "font-semibold text-sm py-2 px-4 rounded-md transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2";
    const variants = {
        primary: "bg-sky-600 text-white hover:bg-sky-700 shadow-sm",
        secondary: "bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50 shadow-sm",
        danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm"
    };

    return (
        <button 
            className={`${base} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
