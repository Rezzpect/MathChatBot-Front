type InputFormProps = {
    value: string;
    error: string | undefined;
    id: string;
    type: string;
    name: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

}

export default function InputForm({ value, error, id, type, name, placeholder = '', onChange }: InputFormProps) {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label className="font-bold" htmlFor={id}>{name}</label>
            <input className={`w-full border p-2 rounded-sm focus:border-primary focus:outline-non
                ${error ? 'border-red-500' : 'border-neutral'
                    }`}
                type={type}
                id={id}
                value={value}
                placeholder={placeholder}
                onChange={onChange} />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    )
}