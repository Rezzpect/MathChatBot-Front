type AuthInputFormProps = {
    value:string;
    error:string | undefined;
    id:string;
    type:string;
    name:string;
    placeholder?:string;
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;

}

export default function AuthInputForm({value,error,id,type,name,placeholder='',onChange}:AuthInputFormProps) {
    return (
        <div className="relative w-full">
            <input id={id}
                className={`block border w-full p-2 rounded-sm focus:border-primary focus:outline-none peer
                                ${error ? 'border-red-500' : 'border-neutral'
                    }`}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value} 
                />
            <label htmlFor={id} className={`absolute text-sm mx-3 px-3 peer-focus:text-primary transform -translate-y-5 top-2 z-10 origin-[0] bg-white 
                                ${error ? 'text-red-500' : 'text-neutral'
                }`}
            >{name}</label>
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    )
}