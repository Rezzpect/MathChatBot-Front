import { useContext, useState } from "react"
import type { QuestionPanelProp } from "../../@types/question"
import supabaseClient from "../../utils/SupabaseClient";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill-new";
import { AuthContext } from "../../contexts/authContext";

export default function QuestionPanel({
    question_id,
    title,
    question,
    setCompleteModal,
    setWrongModal,
    isLoadingQuestion
}: QuestionPanelProp) {
    const { questionId } = useParams();
    const {authData} = useContext(AuthContext);
    const [answer, setAnswer] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const [ isCompleteOpen,setIsCompleteOpen] = useState<boolean>(false);

    const sendAnswer = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabaseClient.functions.invoke('check-student-answer', {
                method: 'PUT',
                body: {
                    "question_id": questionId,
                    "student_answer": answer
                }
            })

            if (error) throw error;

            const result = data.data;

            if (!result) {
                setWrongModal(true);
            } else setCompleteModal(true);
        } catch (error) {
            throw error
        } finally {
            setIsLoading(false);
        }

    }
    return (
        <div className="flex flex-col bg-white rounded-lg w-full h-full justify-between gap-2 " >
            <div className="flex-1 m-5 h-full overflow-y-auto" key={`question-${question_id}`}>
                {isLoadingQuestion
                    ?
                    <div className="w-full h-full flex justify-center items-center">
                        <span className=" loading loading-spinner loading-xl" />
                    </div>
                    :
                    <>
                        <header className="font-bold text-2xl">{title}</header>
                        <ReactQuill
                            value={question}
                            readOnly={true}
                            modules={{
                                toolbar: false
                            }}
                            className="
                        [&_.ql-container]:!border-none
                    "
                        />
                    </>
                }
            </div>

            <form className="flex bg-neutral rounded-t-lg w-full p-2 mt-2"
                onSubmit={(e) => {
                    e.preventDefault()
                    sendAnswer();
                }}>
                <input className="input focus:outline-none rounded-full w-full"
                    placeholder="write your answer here"
                    disabled={isLoading || isLoadingQuestion || authData?.role_name==='teacher'}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                ></input>
                <button className="btn btn-primary text-primary-content rounded-full" disabled={isLoading || isLoadingQuestion} type='submit'>{(isLoading || isLoadingQuestion) ? <span className="loading loading-spinner loading-lg" /> : 'ส่งคำตอบ'}</button>
            </form>
        </div>
    )
}