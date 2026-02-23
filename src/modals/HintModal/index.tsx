import type { HintModalProps } from "../../@types/modal"
import { useEffect, useState } from "react";
import type { TopicForm } from "../../@types/topic";
import supabaseClient from "../../utils/SupabaseClient";
import TextareaForm from "../../components/Form/textareaForm";
import type { HintForm } from "../../@types/hint";
import { useParams } from "react-router-dom";

export default function HintModal(
    { modalData, setOpen, options, refreshSubmit }: HintModalProps
) {
    const { questionId }= useParams();
    const [formData, setFormData] = useState<HintForm>({
        hint_id: '',
        hint_content: '',
        question_id:questionId ?? ''
    })
    const [formError, setFormError] = useState<Partial<HintForm>>({});

    useEffect(() => {
        if (modalData) {
            setFormData((prev)=>({...prev,
                hint_content: modalData.hint_content ?? '',
                hint_id: modalData.hint_id?.toString() ?? '',
            }));
        }
    }, []);
    
    const editHint = async (formData:HintForm) => {
        const { error } = await supabaseClient.functions.invoke('edit-hint',{
            method:'PUT',
            body:{
                hint_id:formData.hint_id,
                hint_content: formData.hint_content
            }
        })

        if (error) throw error
        else refreshSubmit((prev)=>prev+1)
    }

    const createHint = async (formData:HintForm) => {
        const { error } = await supabaseClient.functions.invoke('create-hint',{
            method:'POST',
            body:{
                question_id: questionId,
                hint_content: formData.hint_content
            }
        })

        if (error) throw error
        else refreshSubmit((prev)=>prev+1)
    }

    const validate = () => {
        const rules: Array<{ key: keyof HintForm, condition: boolean, message: string }> = [
            {
                key: 'hint_content',
                condition: (!formData.hint_content),
                message: "Please fill in the the hint example"
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
            alert('validate false')
            return
        }

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

    return (
        <div className="fixed w-full h-full bg-black/50 top-0  flex justify-center items-center z-100">
            <div className="h-fit bg-base-100 shadow-sm rounded-lg w-120">
                <div className="flex flex-col gap-5 p-5 pt-5 text-neutral-content">
                    <h1 className="font-bold text-xl">{ options === 'create' ? 'Create Hint Example' : 'Edit Hint Example'}</h1>
                    <form className="flex flex-col gap-2">

                        <TextareaForm
                            name='ตัวอย่างคำใบ้'
                            error={formError['hint_content']}
                            id='hint_content'
                            value={formData.hint_content}
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