import { useEffect, useState } from 'react';

import RichEditor from '../../components/RichEditor';
import type { editQuestionProps} from '../../@types/question';

export default function ExerciseForm({questionForm,setForm}:editQuestionProps) {
    const [quillDelta,setQuillDelta] = useState<string>('')

    const handleQuestionChange = (content: string) => {
        setForm((prev) => ({ ...prev, question: content }));
    };

    return (
        <div className='py-5 min-h-[400px]'>
            <form className='flex flex-col gap-5 w-full'>
                <input className='border border-neutral px-5 text-neutral-content font-lg rounded-lg h-10 w-full focus:border-black'
                    id='title'
                    placeholder='ใส่ชื่อคำถาม'
                    value={questionForm.title}
                    onChange={(e)=>setForm((prev)=>({...prev,'title':e.target.value}))}
                />

                <RichEditor
                    theme="snow"
                    value={questionForm.question}
                    onChange={handleQuestionChange}
                />

                <div className='flex flex-col gap-2'>
                    <h1 className='font-bold'>Answer</h1>
                    <input className='border border-neutral px-5 text-neutral-content font-lg rounded-lg h-10 w-full focus:border-black'
                        placeholder='ใส่คำตอบ'
                        value={questionForm.answer}
                        onChange={(e)=>setForm((prev)=>({...prev,'answer':e.target.value}))}
                    />
                </div>

            </form>

        </div>
    )
}