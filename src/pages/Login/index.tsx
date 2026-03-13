import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/authContext"
import AuthInputForm from "../../components/Form/authInputForm";

type InputLoginForm = {
    email: string;
    password: string;
}

export default function LoginPage() {
    const [formData, setFormData] = useState<InputLoginForm>({
        email: '',
        password: ''
    })

    const [formError, setFormError] = useState<Partial<InputLoginForm>>({})
    const { login } = useContext(AuthContext)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const error = validate();
        if (!error) {
            login(formData.email, formData.password);
        } else setFormError((prev) => ({ ...prev, ...error }));
        
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, id } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    }

    const validate = () => {
        const rules:Array<{key:keyof InputLoginForm,condition:boolean,message:string}> = [
            {
                key:'email',
                condition:(!formData.email.includes('@')),
                message:'Invalid email address'
            },
            {
                key:'password',
                condition:(formData.password.length < 0),
                message:'password must be atleast 6 character long!'
            },
        ]

        const result = rules.reduce((errors,{key,condition,message})=>{
            if (condition) errors[key] = message;
            return errors;
        },{} as Partial<InputLoginForm>)

        if (Object.keys(result).length !== 0) return result
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-neutral">
            <div className="sm:w-[25rem] w-full h-auto sm:rounded-lg bg-white shadow-sm flex flex-col items-center p-8 gap-5">
                <div className="flex flex-col items-center">
                    <header className="font-bold text-4xl text-primary">MATHEMATIC</header>
                    <header className="font-bold text-xl text-primary">CHATBOT</header>
                </div>
                <form className="flex flex-col gap-5 w-full"
                    onSubmit={handleLogin}>
                    <div className="flex flex-col w-full gap-5">
                        <AuthInputForm
                            name='Email'
                            error={formError['email']}
                            id='email'
                            type='text'
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <AuthInputForm
                            name='Password'
                            error={formError['password']}
                            id='password'
                            type='password'
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <div className="flex justify-between text-sm w-full">
                            <div className="flex items-center gap-1">
                                <input type="checkbox" />
                                <label>Remember me</label>
                            </div>
                            <a>forgot your password</a>
                        </div>
                    </div>

                    <button className="btn bg-primary text-primary-content w-full" type="submit">LOGIN</button>
                </form>
                <p className="divider text-neutral text-sm">or continue with</p>
                <a href="../register" className="text-sm text-primary hover:text-purple-950">Create new account?</a>
            </div>
        </div>
    )
}