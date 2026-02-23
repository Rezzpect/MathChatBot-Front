import { useState } from "react"
import type { QuestionPanelProp } from "../../@types/question"
import supabaseClient from "../../utils/SupabaseClient";
import { useParams } from "react-router-dom";
import CompleteModal from "../../modals/CompleteModal";

export default function QuestionPanel({
    question_id,
    title,
    question,
    setCompleteModal,
    setWrongModal
}: QuestionPanelProp) {
    const { questionId } = useParams();
    const [answer, setAnswer] = useState<string>('');
    // const [ isCompleteOpen,setIsCompleteOpen] = useState<boolean>(false);

    const sendAnswer = async() => {
        const { data } = await supabaseClient.functions.invoke('check-student-answer', {
            method: 'PUT',
            body: {
                "question_id": questionId,
                "student_answer": answer
            }
        })

        const result = data.data;

        if (!result) {
            setWrongModal(true);
        }else setCompleteModal(true);
    }
    return (
        <div className="flex flex-col bg-white rounded-lg w-full h-full justify-between gap-2 " >
            <div className="m-5 h-full overflow-y-auto" key={`question-${question_id}`}>
                <header className="font-bold text-2xl">{title}</header>
                <p>{question}</p>
                <div className="flex justify-center w-full">
                    <img className="flex w-50 h-50 justify-center" src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"></img>
                </div>
            </div>

            <form className="flex bg-neutral rounded-t-lg w-full p-2 mt-2"
            onSubmit={(e)=>{
                e.preventDefault()
                sendAnswer();
            }}>
                <input className="input focus:outline-none rounded-full w-full" 
                placeholder="write your answer here"
                value={answer}
                onChange={(e)=>setAnswer(e.target.value)}
                ></input>
                <button className="btn btn-primary text-primary-content rounded-full" type='submit'>ส่งคำตอบ</button>
            </form>
        </div>
    )
}