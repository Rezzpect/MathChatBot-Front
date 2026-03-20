type InputFormProps = {
    value: string;
    error: string | undefined;
    id: string;
    name: string;
    placeholder?: string;
    readOnly?: boolean;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;

}

export default function TextareaForm({ value, error, id, name, placeholder = '',readOnly=false, onChange }: InputFormProps) {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label className="font-bold" htmlFor={id}>{name}</label>
            <textarea className={`w-full border p-2 rounded-sm focus:border-primary focus:outline-none resize-none
                ${error ? 'border-red-500' : 'border-neutral'
                    }`}

                maxLength={500}
                rows={4}
                id={id}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                disabled={readOnly} />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    )
}