import type { CourseModalProps } from "../../@types/modal"
import { useEffect, useState } from "react";
import supabaseClient from "../../utils/SupabaseClient";
import InputForm from "../../components/Form/inputForm";
import TextareaForm from "../../components/Form/textareaForm";
import type { CourseForm, CourseFormValidate } from "../../@types/courseData";
import { IoIosArrowDown } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function CourseModal(
    { modalData, setOpen, refreshSubmit, bannerUrl }: CourseModalProps
) {
    const [formData, setFormData] = useState<CourseForm>({
        course_name: '',
        difficulty: 'Easy',
        course_description: '',
        is_published: false,
        course_id: '',
    })
    const [formError, setFormError] = useState<Partial<CourseForm>>({});
    const [imageUrl, setImageUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [newImage, setNewImage] = useState<File | undefined>(undefined)
    const { courseId } = useParams();

    const difficulty_list = ['Easy', 'Normal', 'Hard'];

    useEffect(() => {
        if (modalData) {
            setFormData({
                course_name: modalData.course_name ?? '',
                course_description: modalData.course_description ?? '',
                difficulty: modalData.difficulty ?? 'Easy',
                course_id: modalData.course_id?.toString() ?? '',
                is_published: modalData.is_published ?? false,
            });
        }

        if (bannerUrl) {
            setImageUrl(bannerUrl)
        }
    }, []);

    const insertNewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input_file = e.target.files?.[0];
        const allowedTypes = ['image/jpeg', 'image/png'];

        if (!input_file) return;

        if (!allowedTypes.includes(input_file.type)) {
            toast.error('Only JPEG and PNG files are allowed!');
            return;
        }

        const preview_url = URL.createObjectURL(input_file);

        if (imageUrl) URL.revokeObjectURL(imageUrl); //revoke old preview url
        setNewImage(input_file);
        setImageUrl(preview_url);
    }

    const createCourse = async () => {
        setIsLoading(true);
        const filename = '/banner' + Date.now();
        try {
            const { data, error } = await supabaseClient.functions.invoke('create-course', {
                method: 'POST',
                body: {
                    "course_name": formData.course_name,
                    "difficulty": formData.difficulty,
                    "course_description": formData.course_description,
                    "is_published": formData.is_published,
                    "picture_name": newImage ? filename : null
                }
            });

            if (error) {
                toast.error('Failed to create course');
                throw error;
            };

            if (newImage) await uploadImage(newImage, filename, data.data);
            toast.success('Course created successfully');
            refreshSubmit((prev) => prev + 1);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const uploadImage = async (new_image: File, filename: string, course_id?: string) => {
        const { error } = await supabaseClient.storage.from('course_banner').upload(course_id ? course_id + filename : courseId + filename, new_image);
        try {
            if (modalData?.banner_picture) {
                const { error } = await supabaseClient.storage.from('course_banner')
                    .remove([course_id ?
                        `${course_id}${modalData.banner_picture}`
                        : `${courseId}${modalData.banner_picture}`]);

                if (error) {
                    throw error
                }
            }

            if (error) {
                throw error;
            }
        } catch (error) {
            toast.error('Failed to upload banner image');
            throw error;
        }
    }

    const editCourse = async () => {
        setIsLoading(true);
        const filename = '/banner' + Date.now();
        try {

            const { error } = await supabaseClient.functions.invoke('edit-course', {
                method: 'PUT',
                body: {
                    "course_name": formData.course_name,
                    "difficulty": "Easy",
                    "course_description": formData.course_description,
                    "course_id": formData.course_id,
                    "is_published": formData.is_published,
                    "picture_name": newImage ? filename : modalData?.banner_picture
                }
            });

            if (error) {
                toast.error('Failed to update course');
                throw error;
            }

            toast.success('Course edited successfully');
            if (newImage) await uploadImage(newImage, filename);
            refreshSubmit((prev) => prev + 1);
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }

    const handleSave = async () => {
        const error = validate();

        if (error) {
            setFormError({ ...error });
            toast.error('Invalid Course')
            return
        } else setFormError({})

        if (modalData) {
            await editCourse();
        } else {
            await createCourse();
        }

        setOpen(false);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, id } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    const validate = () => {
        const rules: Array<{ key: keyof CourseFormValidate, condition: boolean, message: string }> = [
            {
                key: 'course_name',
                condition: (!formData.course_name),
                message: "Please fill in the course name"
            },
        ]

        const result = rules.reduce((errors, { key, condition, message }) => {
            if (condition) errors[key] = message
            return errors;
        }, {} as Partial<CourseFormValidate>);

        if (Object.keys(result).length !== 0) return result
    };

    useEffect(() => {
        document.body.classList.add('overflow-hidden')

        return () => {
            document.body.classList.remove('overflow-hidden')
        }
    }, [])

    return (
        <div className="fixed w-full h-full bg-black/50 top-0  flex justify-center items-center z-100">
            <div className="h-fit bg-base-100 shadow-sm rounded-lg w-120">
                <div className="relative w-full h-[12rem] bg-primary overflow-hidden rounded-t-lg">
                    {
                        imageUrl && <img src={imageUrl} className=" absolute h-full w-full" />
                    }
                    <label className="absolute right-0 p-1 m-5 shadow-lg border hover:cursor-pointer bg-primary text-primary-content rounded-full h-fit w-fit">
                        <MdEdit className="text-lg" />
                        <input type='file' max={1} onChange={insertNewImg} accept="image/jpeg, image/png" className="hidden" />
                    </label>
                </div>

                <div className="flex flex-col gap-5 p-5 pt-5 text-neutral-content">
                    <h1 className="font-bold text-xl">{modalData ? 'Edit Course' : 'Create Course'}</h1>
                    <div className="flex flex-col gap-2">
                        <InputForm
                            name='Course Name'
                            error={formError['course_name']}
                            id='course_name'
                            type='text'
                            value={formData.course_name}
                            onChange={handleInputChange}
                        />

                        <TextareaForm
                            name='Desciption'
                            error={formError['course_description']}
                            id='course_description'
                            value={formData.course_description}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="dropdown border border-neutral rounded-lg">
                        <div tabIndex={0} role="button" className="flex justify-between font-bold items-center gap-2 hover:cursor-pointer hover:bg-base-300 p-2 rounded-lg">
                            <header>{formData.difficulty}</header><IoIosArrowDown />
                        </div>
                        <ul id={'difficulty-dropdown'} tabIndex={-1} className="dropdown-content font-bold menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            {difficulty_list.map((mode_name) =>
                                <li>
                                    <a onClick={() => {
                                        setFormData((prev) => ({ ...prev, difficulty: mode_name }));
                                        document.getElementById('difficulty-dropdown')?.blur();
                                    }}>
                                        {mode_name}
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className="flex w-full justify-between">
                        <label className="flex items-center gap-2 rounded-full bg-white border border-black py-2 px-5 h-fit text-black font-bold text-md" htmlFor="is_publish">
                            <input className="checkbox checkbox-primary rounded-lg" id="is_publish" checked={formData.is_published} onChange={() => setFormData((prev) => ({ ...prev, is_published: !formData.is_published }))} type="checkbox" />
                            <div>
                                เผยแพร่
                            </div>
                        </label>


                        <div className="flex gap-2">
                            <button
                                onClick={() => setOpen(false)}
                                className="hover:cursor-pointer rounded-full bg-white border border-black text-black font-bold text-lg py-2 px-5">Cancel
                            </button>

                            <button
                                onClick={handleSave}
                                disabled={isLoading}
                                className="hover:cursor-pointer rounded-full bg-primary text-primary-content font-bold text-lg py-2 px-5">
                                {
                                    isLoading ? (<span className="loading loading-spinner" />) :
                                        'Save'
                                }
                            </button>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
}