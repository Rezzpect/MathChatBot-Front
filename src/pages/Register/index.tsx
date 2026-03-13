import { useState } from "react"
import supabaseClient from "../../utils/SupabaseClient"
import AuthInputForm from "../../components/Form/authInputForm";

type InputRegisterForm = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
    role_id: string;
}

export default function RegisterPage() {
    const [formData, setFormData] = useState<InputRegisterForm>({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        role_id:'1'
    });
    const [formError, setFormError] = useState<Partial<InputRegisterForm>>({});

    const SignUp = async () => {
        try {
            const { data, error } = await supabaseClient.auth.signUp(
                {
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            first_name: formData.first_name,
                            last_name: formData.last_name,
                            role_id: formData.role_id
                        },
                        emailRedirectTo: 'https://example.com/welcome'
                    }
                }
            )

            if (error) {
                alert(error);
                throw error
            }

            if (data) {
                console.log(data);
            }
        } catch (error) {
            alert(error);
            throw error;
        }
    }

    const validate = () => {
        const rules: Array<{ key: keyof InputRegisterForm, condition: boolean, message: string }> = [
            {
                key: 'first_name',
                condition: (!formData.first_name),
                message: "Please fill in your first name"
            },
            {
                key: 'last_name',
                condition: (!formData.first_name),
                message: "Please fill in your last name"
            },
            {
                key: 'email',
                condition: (!formData.email.includes('@')),
                message: "Invalid email address"
            },
            {
                key: 'confirm_password',
                condition: (formData.password !== formData.confirm_password),
                message: 'Password does not match'
            },
            {
                key: 'password',
                condition: (formData.password.length < 6),
                message: 'password must be atleast 6 character long!'
            }

        ]

        const result = rules.reduce((errors, { condition, key, message }) => {
            if (condition) errors[key] = message;
            return errors;
        }, {} as Partial<InputRegisterForm>);

        if (Object.keys(result).length !== 0) return result
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const error = validate();

        if (!error) {
            SignUp();
        } else setFormError((prev) => ({ ...prev, ...error }));
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, id } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    }

    const handleChangeRole = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = e.target;
        setFormData((prev)=>({...prev,role_id:value}))
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-neutral">
            <div className="sm:w-[30rem] w-full h-auto sm:rounded-lg bg-white shadow-sm flex flex-col items-center p-8 gap-5">
                <div className="flex flex-col items-center">
                    <header className="font-bold text-4xl text-primary">MATHEMATIC</header>
                    <header className="font-bold text-xl text-primary">CHATBOT</header>
                </div>
                <form className="flex flex-col w-full gap-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col w-full gap-5">
                        <div className="flex gap-2 w-full justify-center">
                            <AuthInputForm
                                name='First Name'
                                error={formError['first_name']}
                                id='first_name'
                                type='text'
                                value={formData.first_name}
                                onChange={handleInputChange}
                            />
                            <AuthInputForm
                                name='Last Name'
                                error={formError['last_name']}
                                id='last_name'
                                type='text'
                                value={formData.last_name}
                                onChange={handleInputChange}
                            />
                        </div>

                        <span className="divider" />
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
                        <AuthInputForm
                            name='Confirm Password'
                            error={formError['confirm_password']}
                            id='confirm_password'
                            type='password'
                            value={formData.confirm_password}
                            onChange={handleInputChange}
                        />

                        <select onChange={(handleChangeRole)} className="select w-full border-neutral focus:outline-none focus:border-primary">
                            <option disabled={true}>เลือกบทบาทที่ต้องการ</option>
                            <option value='1'>Student</option>
                            <option value='2'>Teacher</option>
                        </select>
                    </div>

                    <button className="btn bg-primary text-primary-content w-full">Create account</button>
                </form>

                <p className="divider text-neutral text-sm">or continue with</p>
                <a href="../login" className="text-sm text-primary hover:text-purple-950">Already have an account?</a>
            </div>
        </div>
    )
}