import type { CourseModalProps } from "../../@types/modal"
import { useEffect, useState } from "react";
import supabaseClient from "../../utils/SupabaseClient";
import InputForm from "../../components/Form/inputForm";
import TextareaForm from "../../components/Form/textareaForm";
import type { CourseForm } from "../../@types/courseData";

export default function CourseModal(
    { modalData, setOpen, options, refreshSubmit }: CourseModalProps
) {
    const [formData, setFormData] = useState<CourseForm>({
        course_name: '',
        difficulty: '',
        course_description: '',
        is_published: false,
        course_id: '',
    })
    const [formError, setFormError] = useState<Partial<CourseForm>>({});

    useEffect(() => {
        if (modalData) {
            setFormData({
                course_name: modalData.course_name ?? '',
                course_description: modalData.course_description ?? '',
                difficulty: modalData.difficulty ?? '',
                course_id: modalData.course_id?.toString() ?? '',
                is_published: false,
            });
        }
    }, []);

    const createCourse = async () => {
        const { error } = await supabaseClient.functions.invoke('create-course', {
            method: 'POST',
            body: {
                "course_name": formData.course_name,
                "difficulty": "Easy",
                "course_description": formData.course_description,
                "is_published": true
            }
        })
    }

    const editCourse = async () => {
        const { error } = await supabaseClient.functions.invoke('edit-course', {
            method: 'PUT',
            body: {
                "course_name": formData.course_name,
                "difficulty": "Easy",
                "course_description": formData.course_description,
                "course_id": formData.course_id,
                "is_published": true
            }
        })
    }


    const handleSave = () => {
        // const error = validate();

        // if (error) {
        //     setFormError({ ...error });
        //     alert('validate false');
        //     return
        // }

        if (options === 'edit') {
            editCourse();
        } else if (options === 'create') {
            createCourse();
        }

        setOpen(false);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, id } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }))
    }



    return (
        <div className="fixed w-full h-full bg-black/50 top-0  flex justify-center items-center z-100">
            <div className="h-fit bg-base-100 shadow-sm rounded-lg w-120">
                <div className="flex flex-col gap-5 p-5 pt-5 text-neutral-content">
                    <h1 className="font-bold text-xl">{options === 'create' ? 'Create Topic' : 'Edit Topic'}</h1>
                    <form className="flex flex-col gap-2">
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