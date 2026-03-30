import { MdEdit } from "react-icons/md";
import type { ProfileModalProps } from "../../@types/modal";
import { useContext, useEffect, useState } from "react";
import supabaseClient from "../../utils/SupabaseClient";
import InputForm from "../../components/Form/inputForm";
import type { UserFormData } from "../../@types/authdata";
import { AuthContext } from "../../contexts/authContext";
import toast from "react-hot-toast";


export default function EditProfileModal(
    { pictureUrl, setOpen }: ProfileModalProps
) {
    const [formData, setFormData] = useState<UserFormData>({
        first_name: '',
        last_name: '',
        email: '',
        profile_picture: '',
        picture_url: '',
        user_id: ''
    })
    const { authData, refreshAuthData } = useContext(AuthContext);
    const [formError, setFormError] = useState<Partial<UserFormData>>({})
    const [newImage, setNewImage] = useState<File | undefined>(undefined);
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    const [isLoading,setIsLoading] = useState<boolean>(false);

    const insertNewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input_file = e.target.files?.[0];

        if (!input_file) return;

        const preview_url = URL.createObjectURL(input_file);

        if (imageUrl) URL.revokeObjectURL(imageUrl);
        setNewImage(input_file);
        setImageUrl(preview_url);
    }

    useEffect(() => {
        if (!authData) return

        setFormData({
            first_name: authData.first_name,
            last_name: authData.last_name,
            email: authData.email,
            profile_picture: authData.profile_picture,
            picture_url: pictureUrl,
            user_id: authData.user_id
        })

        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl)
            };
        };
    }, []);

    const validate = () => {
        const rules: Array<{ key: keyof UserFormData, condition: boolean, message: string }> = [
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
        }, {} as Partial<UserFormData>);

        if (Object.keys(result).length !== 0) return result
    };

    const uploadImage = async (new_image: File, filename: string) => {
        if (!authData) return

        const { error: UploadError } = await supabaseClient.storage.from('profile_image').upload(authData.user_id + filename, new_image);

        if (UploadError) {
            toast.error('failed to upload profile image')
            throw UploadError;
        }

        if (formData?.profile_picture) {
            const { error } = await supabaseClient.storage.from('profile_image').remove([authData.user_id + formData.profile_picture]);

            if (error) {
                toast.error(error.message);
                throw error
            }
        }
    }

    const EditProfile = async (first_name: string, last_name: string) => {
        const filename = `/profile${Date.now()}`;
        setIsLoading(true);
        try {

            if (!authData) return

            const { error } = await supabaseClient.functions.invoke('edit-profile-detail', {
                method: 'PUT',
                body: {
                    "first_name": first_name,
                    "last_name": last_name,
                    "picture_name": newImage ? filename : formData.profile_picture
                }
            })

            if (error) {
                toast.error('Failed to update profile');
                throw error
            }

            if (newImage) {
                await uploadImage(newImage, filename);
            }
            toast.success('Profile updated successfully')
            refreshAuthData();
        } catch (error) {
            toast.error('Something went wrong');
            throw error
        }finally{
            setIsLoading(false);
        };
    }

    const handleSave = async () => {
        if (formData.first_name === authData?.first_name
            && formData.last_name === authData.last_name
            && !newImage) {
            setOpen(false);
            return
        }

        const error = validate();

        if (error) {
            setFormError({ ...error });
            toast.error('Invalid Profile')
            return
        } else setFormError({})

        await EditProfile(formData.first_name, formData.last_name); //edit-profile
        setOpen(false);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, id } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    useEffect(() => {
        document.body.classList.add('overflow-hidden')

        return () => {
            document.body.classList.remove('overflow-hidden')
        }
    }, [])

    return (
        <div className="fixed w-full h-full bg-black/50 top-0  flex justify-center items-center z-100">
            <div className="h-fit bg-base-100 shadow-sm rounded-lg w-120">
                {/* Banner Image */}
                <div className="relative flex justify-center rounded-t-lg w-full h-[130px] mb-5 bg-primary">
                    {/* Profile Image */}
                    <div className="flex justify-center avatar absolute w-[100px] bottom-[-30px]">
                        <div className="rounded-full">
                            <img src={imageUrl
                                ? imageUrl
                                : formData.picture_url !== ''
                                    ? formData.picture_url
                                    : '/anonymous-user.png'
                            } />
                        </div>
                        <label className="absolute bottom-0 right-0 p-1 shadow-sm btn btn-primary text-primary-content rounded-full h-fit w-fit">
                            <MdEdit className="text-lg" />
                            <input type='file' max={1} onChange={insertNewImg} className="hidden" />
                        </label>

                    </div>
                </div>

                {/* Name and Description */}
                <div className="flex flex-col gap-10 p-5 pt-10 text-neutral-content">
                    <div className="flex flex-col gap-2" >
                        {/* <div className="flex gap-5 w-full"> */}
                        <InputForm
                            name='First Name'
                            error={formError['first_name']}
                            id='first_name'
                            type='text'
                            value={formData.first_name}
                            onChange={handleInputChange}
                            readOnly={isLoading}
                        />

                        <InputForm
                            name='Last Name'
                            error={formError['last_name']}
                            id='last_name'
                            type='text'
                            value={formData.last_name}
                            onChange={handleInputChange}
                            readOnly={isLoading}
                        />

                        {/* </div> */}

                        {/* <InputForm
                            name='Email'
                            error={formError['email']}
                            id='email'
                            type='email'
                            value={formData.email}
                            onChange={handleInputChange}
                        /> */}
                    </div>
                    <div className="flex w-full justify-end gap-2">
                        <button
                            onClick={() => setOpen(false)}
                            disabled={isLoading}
                            className="btn btn-white rounded-full border border-black text-black font-bold text-lg py-2 px-5">Cancel</button>

                        <button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="btn btn-primary rounded-full text-primary-content font-bold text-lg py-2 px-5">{isLoading? <span className="loading loading-spinner text-primary-content" />:<>Save</>}</button>
                    </div>
                </div>


            </div>
        </div>
    )
}