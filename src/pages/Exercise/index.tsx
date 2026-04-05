import { useState, useEffect } from "react"
import supabaseClient from "../../utils/SupabaseClient";
import { useNavigate, useParams } from "react-router-dom";
import type { QuestionData } from "../../@types/question";
import Chatbot from "../../components/ChatBot";
import TabMenu from "../../components/TabMenu/tabMenu";
import QuestionPanel from "./QuestionPanel";

import CompleteModal from "../../modals/CompleteModal";
import WrongModal from "../../modals/WrongModal";
import type { ChatMessage } from "../../@types/chatbot";

export default function ExercisePage() {
    const [questionData, setQuestionData] = useState<QuestionData>();
    const [isCompleteOpen, setIsCompleteOpen] = useState<boolean>(false);
    const [isWrongOpen, setIsWrongOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const params = useParams();
    const navigate = useNavigate();

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabaseClient.functions.invoke("question-detail", {
                'body': {
                    "question_id": Number(params.questionId)
                }
            })

            if (error) {
                throw error
            }

            if (data) {
                setQuestionData(data.data[0]);
            }
        }
        catch (error) {
            throw error
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => { fetchData() }, [])

    const tab_data = [
        {
            label: "Topic 1", content:
                <div className="w-full border-4 rounded-lg h-[82vh] border-neutral">
                    <QuestionPanel
                        question_id={questionData?.question_id}
                        title={questionData?.title}
                        question={questionData?.question}
                        setWrongModal={setIsWrongOpen}
                        setCompleteModal={setIsCompleteOpen}
                        isLoadingQuestion={isLoading}
                    />
                </div>

        },
        {
            label: "Topic 2", content:
                <div className="flex flex-col items-center bg-neutral rounded-lg h-[82vh] shadow-sm">
                    <Chatbot messages={messages} setMessages={setMessages} />
                </div>

        }
    ]
    return (
        <div className="flex flex-col h-full w-full justify-center pb-5">
            {isWrongOpen && <WrongModal setOpen={setIsWrongOpen} />}
            {isCompleteOpen && <CompleteModal setOpen={setIsCompleteOpen} topicId={questionData?.topic_id} />}

            <div className="flex h-[50px] py-10 px-15 items-center">
                <header className="flex text-xl font-bold text-black flex-1">แบบฝึกหัด</header>

                <div className="flex justify-end gap-2">
                    <button className="btn btn-white text-black border border-black rounded-full" onClick={() => { navigate(`/topic/${questionData?.topic_id}`) }}>ย้อนกลับ</button>
                </div>
            </div>

            <div className="h-fit min-h-fit flex justify-center px-15 gap-15">
                <div className="hidden md:flex rounded-lg w-[70%] h-[82vh] shadow-sm gap-2 border-4 border-neutral" >
                    <QuestionPanel
                        question_id={questionData?.question_id}
                        title={questionData?.title}
                        question={questionData?.question}
                        setWrongModal={setIsWrongOpen}
                        setCompleteModal={setIsCompleteOpen}
                        isLoadingQuestion={isLoading}
                    />
                </div>


                <div className="hidden md:flex flex-col items-center bg-neutral rounded-lg w-[40%] h-[82vh] shadow-sm">
                    <Chatbot messages={messages} setMessages={setMessages} />
                </div>

                <div className="md:hidden flex w-full">
                    <TabMenu tab_data={tab_data} />
                </div>

            </div>
        </div>
    )
}