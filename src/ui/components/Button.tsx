import { JSX } from 'preact';

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    children: any;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
    const base = "font-bold text-sm py-2 px-4 rounded-md transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
    const variants = {
        primary: "bg-sky-200 text-sky-1000 hover:bg-sky-300",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-200",
        danger: "bg-red-50 text-red-600 hover:bg-red-100"
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
