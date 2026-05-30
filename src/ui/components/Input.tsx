import { JSX } from 'preact';

interface InputProps extends Omit<JSX.HTMLAttributes<HTMLInputElement>, 'label'> {
    label?: string;
    description?: string;
    checked?: boolean;
    error?: string;
    type?: 'text' | 'number' | 'range' | 'checkbox' | 'password' | 'email';
}

export function Input({ 
    label, 
    description, 
    error, 
    checked,
    type = 'text', 
    className = '', 
    ...props 
}: InputProps) {
    const isToggle = type === 'checkbox';
    
    const inputBase = "w-full bg-white border border-neutral-300 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all px-3 py-2 text-sm";
    const rangeBase = "w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-sky-600";
    
    if (isToggle) {
        return (
            <div className={`flex items-center justify-between ${className}`}>
                <div>
                    {label && <label className="block text-sm font-semibold text-neutral-800">{label}</label>}
                    {description && <p className="text-xs text-neutral-500">{description}</p>}
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        {...props}
                    />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
                </label>
            </div>
        );
    }

    return (
        <div className={className}>
            {label && <label className="block text-sm font-semibold text-neutral-800 mb-1">{label}</label>}
            {description && <p className="text-xs text-neutral-500 mb-2">{description}</p>}
            <input
                type={type}
                className={type === 'range' ? rangeBase : inputBase}
                {...props}
            />
            {error && <p className="mt-1 text-xs text-red-600 font-medium">{error}</p>}
        </div>
    );
}
