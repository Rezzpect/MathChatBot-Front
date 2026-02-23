import { MdEdit } from "react-icons/md";
import type { EditModalProps } from "../../@types/modal";
import { useEffect, useState } from "react";
import supabaseClient from "../../utils/SupabaseClient";
import InputForm from "../../components/Form/inputForm";

type editProfileForm = {
    first_name: string,
    last_name: string,
    email: string
}

export default function EditProfileModal(
    { userData, onSubmit, setOpen }: EditModalProps
) {
    const [formData, setFormData] = useState<editProfileForm>({
        first_name: '',
        last_name: '',
        email: ''
    })
    const [formError, setFormError] = useState<Partial<editProfileForm>>({})

    useEffect(() => {
        if (userData) {
            setFormData({
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email
            })
        }
    }, []);

    const validate = () => {
        const rules: Array<{ key: keyof editProfileForm, condition: boolean, message: string }> = [
            {
                key: 'first_name',
                condition: (!formData.first_name),
                message: "Please fill in your first name"
            },
            {
                key: 'last_name',
                condition: (!formData.last_name),
                message: "Please fill in your last name"
            },
            {
                key: 'email',
                condition: (!formData.email.includes('@')),
                message: "Invalid email address"
            }
        ]

        const result = rules.reduce((errors, { key, condition, message }) => {
            if (condition) errors[key] = message;
            return errors;
        }, {} as Partial<editProfileForm>);

        if (Object.keys(result).length !== 0) return result
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        const error = validate()

        if (!error) {
            onSubmit(formData.first_name, formData.last_name);
            setOpen(false);
        }else setFormError({...error})

    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, id } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    return (
        <div className="fixed w-full h-full bg-black/50 top-0  flex justify-center items-center z-100">
            <div className="h-fit bg-base-100 shadow-sm rounded-lg w-120">
                {/* Banner Image */}
                <div className="relative flex justify-center rounded-t-lg w-full h-[130px] mb-5 bg-primary">
                    {/* Profile Image */}
                    <div className="flex justify-center avatar absolute w-[100px] bottom-[-30px]">
                        <div className="rounded-full">
                            <img src="https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp" />
                        </div>
                        <button className="absolute bottom-0 right-0 p-1 shadow-sm hover:cursor-pointer text-lg bg-primary text-primary-content rounded-full"><MdEdit /></button>
                    </div>
                </div>

                {/* Name and Description */}
                <div className="flex flex-col gap-10 p-5 pt-10 text-neutral-content">
                    <form className="flex flex-col gap-2" onSubmit={handleSave}>
                        <div className="flex gap-5 w-full">
                            <InputForm
                                name='First Name'
                                error={formError['first_name']}
                                id='first_name'
                                type='text'
                                value={formData.first_name}
                                onChange={handleInputChange}
                            />

                            <InputForm
                                name='Last Name'
                                error={formError['last_name']}
                                id='last_name'
                                type='text'
                                value={formData.last_name}
                                onChange={handleInputChange}
                            />

                        </div>

                        <InputForm
                            name='Email'
                            error={formError['email']}
                            id='email'
                            type='email'
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </form>
                    <div className="flex w-full justify-end gap-2">
                        <button
                            onClick={() => setOpen(false)}
                            className="hover:cursor-pointer rounded-full bg-white border border-black text-black font-bold text-lg py-2 px-5">Cancel</button>

                        <button
                            onClick={handleSave}
                            className="hover:cursor-pointer rounded-full bg-primary text-primary-content font-bold text-lg py-2 px-5">Save</button>
                    </div>
                </div>


            </div>
        </div>
    )
}