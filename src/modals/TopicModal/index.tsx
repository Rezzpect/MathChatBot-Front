import type { topicModalProps } from "../../@types/modal"
import { useEffect, useState } from "react";
import type { TopicForm } from "../../@types/topic";
import supabaseClient from "../../utils/SupabaseClient";
import InputForm from "../../components/Form/inputForm";
import TextareaForm from "../../components/Form/textareaForm";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function TopicModal(
    { modalData, setOpen, options, refreshSubmit }: topicModalProps
) {
    const { courseId } = useParams();
    const [formData, setFormData] = useState<TopicForm>({
        topic_name: '',
        topic_description: '',
        topic_id: '',
        course_id: courseId
    })
    const [formError, setFormError] = useState<Partial<TopicForm>>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (modalData) {
            setFormData((prev) => ({
                ...prev,
                topic_name: modalData.topic_name ?? '',
                topic_description: modalData.topic_description ?? '',
                topic_id: modalData.topic_id?.toString() ?? ''
            }));
        }
    }, []);

    const editTopic = async (formData: TopicForm) => {
        setIsLoading(true);
        try {
            const { error } = await supabaseClient.functions.invoke('edit-topic', {
                method: 'PUT',
                body: {
                    "topic_id": formData.topic_id,
                    "topic_name": formData.topic_name,
                    "topic_description": formData.topic_description
                }
            })
            if (error) throw error
            refreshSubmit((prev) => prev + 1);
            toast.success('Edit topic successfully')
            setOpen(false);
        } catch (error) {
            toast.error('Failed to edit topic');
        } finally {
            setIsLoading(false);
        }
    }

    const createTopic = async (formData: TopicForm) => {
        setIsLoading(true);
        try {
            const { error } = await supabaseClient.functions.invoke('create-topic', {
                method: 'POST',
                body: {
                    "course_id": formData.course_id,
                    "topic_name": formData.topic_name,
                    "topic_description": formData.topic_description
                }
            })
            if (error) throw error
            refreshSubmit((prev) => prev + 1);
            toast.success('Create topic successfully')
            setOpen(false);
        } catch (error) {
            toast.error('Failed to create topic')
        } finally {
            setIsLoading(false);
        }

    }

    const validate = () => {
        const rules: Array<{ key: keyof TopicForm, condition: boolean, message: string }> = [
            {
                key: 'topic_name',
                condition: (!formData.topic_name),
                message: "Please fill in the topic name"
            }
        ]

        const result = rules.reduce((errors, { key, condition, message }) => {
            if (condition) errors[key] = message;
            return errors;
        }, {} as Partial<TopicForm>);

        if (Object.keys(result).length !== 0) return result
    };

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const error = validate();

        if (error) {
            setFormError({ ...error });
            alert('validate false');
            return
        }

        if (options === 'edit') {
            editTopic(formData);
        } else if (options === 'create') {
            createTopic(formData);
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        <div className="fixed w-full h-full bg-black/50 top-0 left-0 flex justify-center items-center z-100">
            <div className="h-fit bg-base-100 shadow-sm rounded-lg w-120">
                <div className="flex flex-col gap-5 p-5 pt-5 text-neutral-content">
                    <h1 className="font-bold text-xl">{options === 'create' ? 'Create Topic' : 'Edit Topic'}</h1>
                    <form onSubmit={handleSave} className="flex flex-col gap-2">
                        <InputForm
                            name='Topic Name'
                            error={formError['topic_name']}
                            id='topic_name'
                            type='text'
                            value={formData.topic_name}
                            onChange={handleInputChange}
                            readOnly={isLoading}
                        />

                        <TextareaForm
                            name='Desciption'
                            error={formError['topic_description']}
                            id='topic_description'
                            value={formData.topic_description}
                            onChange={handleInputChange}
                            readOnly={isLoading}
                        />
                        <div className="flex w-full justify-end gap-2 pt-3">
                            <button
                                onClick={() => setOpen(false)}
                                disabled={isLoading}
                                className="btn btn-white rounded-full border-black text-black font-bold text-lg py-2 px-5">Cancel</button>

                            <button
                                type='submit'
                                disabled={isLoading}
                                className="btn btn-primary rounded-full text-primary-content font-bold text-lg py-2 px-5">{isLoading ? <span className="loading loading-spinner text-primary-content" /> : <>Save</>}</button>
                        </div>
                    </form>

                </div>


            </div>
        </div>
    )
}