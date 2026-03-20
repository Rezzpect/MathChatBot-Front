import type { HintModalProps } from "../../@types/modal"
import { useEffect, useState } from "react";
import type { TopicForm } from "../../@types/topic";
import supabaseClient from "../../utils/SupabaseClient";
import TextareaForm from "../../components/Form/textareaForm";
import type { HintForm } from "../../@types/hint";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import InputForm from "../../components/Form/inputForm";
interface PresetHint {
    title: string;
    detail: string;
}

export default function HintModal(
    { modalData, setOpen, options, refreshSubmit }: HintModalProps
) {
    const { questionId } = useParams();
    const [formData, setFormData] = useState<HintForm>({
        hint_id: '',
        hint_content: '',
        hint_title: ''
    })
    const [formError, setFormError] = useState<Partial<HintForm>>({});
    const [isGeneratingHint, setIsGeneratingHint] = useState<boolean>(false);
    const [generatedHint, setGeneratedHint] = useState<PresetHint[]>([]);

    useEffect(() => {
        if (modalData) {
            setFormData((prev) => ({
                ...prev,
                hint_content: modalData.hint_content ?? '',
                hint_id: modalData.hint_id?.toString() ?? '',
            }));
        }
    }, []);

    const generateHint = async () => {
        setIsGeneratingHint(true);
        try {
            const { data, error } = await supabaseClient.functions.invoke('generate-hint', {
                body: {
                    question_id: questionId
                }
            })

            if (error) {
                throw error
            }
            if (data.data) {
                console.log(data.data);
                setGeneratedHint(data.data);
            }
        } catch (error) {
            toast.error('Unable to generate hints')
        } finally {
            setIsGeneratingHint(false);
        }

    }

    const editHint = async (formData: HintForm) => {
        const { error } = await supabaseClient.functions.invoke('edit-hint', {
            method: 'PUT',
            body: {
                hint_id: formData.hint_id,
                hint_content: formData.hint_content,
                hint_title: formData.hint_title
            }
        })

        if (error) {
            toast.error(error.message);
            throw error
        }
        else {
            toast.success('Hint edited succesfully')
            refreshSubmit((prev) => prev + 1)

        }
    }

    const createHint = async (formData: HintForm) => {
        const { error } = await supabaseClient.functions.invoke('create-hint', {
            method: 'POST',
            body: {
                question_id: questionId,
                hint_title: formData.hint_title,
                hint_content: formData.hint_content
            }
        })

        if (error) {
            toast.error(error.message);
            throw error
        } else {
            toast.success('Hint created succesfully')
            refreshSubmit((prev) => prev + 1)
        }
    }

    const validate = () => {
        const rules: Array<{ key: keyof HintForm, condition: boolean, message: string }> = [
            {
                key: 'hint_content',
                condition: (!formData.hint_content),
                message: "Please fill in the the hint example"
            },
            {
                key: 'hint_title',
                condition: (!formData.hint_title),
                message: "Please fill in the the question example"
            }
        ]
        const result = rules.reduce((errors, { key, condition, message }) => {
            if (condition) errors[key] = message;
            return errors;
        }, {} as Partial<HintForm>);

        if (Object.keys(result).length !== 0) return result
    };

    const handleSave = () => {
        const error = validate();

        if (error) {
            setFormError({ ...error });
            toast.error('Invalid Hint')
            return
        } else setFormError({});

        if (options === 'edit') {
            editHint(formData);
        } else if (options === 'create') {
            createHint(formData)
        }

        setOpen(false);
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

    useEffect(() => {
        generateHint();
    }, [])

    return (
        <div className="fixed w-full h-full bg-black/50 top-0 left-0 flex justify-center items-center z-100">

            <div className="flex flex-col overflow-hidden max-h-[90vh] bg-base-100 shadow-sm rounded-lg w-130">
                <div className="flex-1 overflow-y-auto p-5 pt-5 text-neutral-content">
                    <h1 className="font-bold text-xl mb-5">{options === 'create' ? 'Create Hint Example' : 'Edit Hint Example'}</h1>
                    <form className="flex flex-col gap-2" onSubmit={(e)=>e.preventDefault()}>
                        <InputForm
                            name='ตัวอย่างคำถาม'
                            error={formError['hint_title']}
                            type='text'
                            id='hint_title'
                            value={formData.hint_title}
                            onChange={handleInputChange}
                        />

                        <TextareaForm
                            name='ตัวอย่างคำใบ้'
                            error={formError['hint_content']}
                            id='hint_content'
                            value={formData.hint_content}
                            onChange={handleInputChange}
                        />
                    </form>

                    <div className="flex flex-col gap-2 h-60">
                        <span className="divider divider-primary" />
                        <div className="flex w-full justify-between">
                            <header className="font-bold text-lg">ตัวอย่างสำเร็จรูป</header>
                            <button className="btn btn-primary btn-ghost rounded-full p-2 text-primary hover:text-primary-content" onClick={generateHint}>Refresh</button>
                        </div>
                        {isGeneratingHint
                            ? <div className="flex justify-around items-center w-full h-full bg-neutral rounded-lg">
                                <span className="loading loading-spinner text-primary loading-xl" />
                            </div>

                            : <div className="flex flex-col gap-2 overflow-y-auto">
                                {
                                    generatedHint.map((set) => (
                                        <div className="border border-neutral rounded-lg p-2 hover:cursor-pointer"
                                            onClick={() => setFormData((prev) => ({ ...prev, hint_title: set.title, hint_content: set.detail }))}
                                        >
                                            <header className="text-md font-bold">{set.title}</header>
                                            <p>{set.detail}</p>
                                        </div>
                                    ))}
                            </div>
                        }
                    </div>

                </div>
                <div className="flex w-full justify-end gap-2 p-5 border-t border-neutral shrink-0">
                    <button
                        onClick={() => setOpen(false)}
                        className="btn btn-white rounded-full border border-black text-black font-bold text-lg py-2 px-5">Cancel</button>

                    <button
                        onClick={handleSave}
                        className="btn rounded-full btn-primary text-primary-content font-bold text-lg py-2 px-5">Save</button>
                </div>

            </div>
        </div>
    )
}