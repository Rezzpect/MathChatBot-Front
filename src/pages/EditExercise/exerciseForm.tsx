import { useState } from 'react';

import RichEditor from '../../components/RichEditor';

export default function ExerciseForm() {
    const [title, setTitle] = useState<string>('');
    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');
    const [isEdit, setIsEdit] = useState<boolean>(false);

    return (
        <div className='py-5 min-h-[400px]'>
            <form className='flex flex-col gap-5 w-full'>
                <input className='border border-neutral px-5 text-neutral-content font-lg rounded-lg h-10 w-full focus:border-black'
                    placeholder='ใส่ชื่อคำถาม'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <RichEditor
                    theme="snow"
                    value={question}
                    onChange={setQuestion}
                />

                <div className='flex flex-col gap-2'>
                    <h1 className='font-bold'>Answer</h1>
                    <input className='border border-neutral px-5 text-neutral-content font-lg rounded-lg h-10 w-full focus:border-black'
                        placeholder='ใส่คำตอบ'
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                </div>

            </form>

        </div>
    )
}