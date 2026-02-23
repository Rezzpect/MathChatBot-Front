import { useState, useEffect } from "react"
import { GiHamburgerMenu } from "react-icons/gi";
import { FaX } from "react-icons/fa6"
import supabaseClient from "../../utils/SupabaseClient";
import { useParams } from "react-router-dom";
import type { QuestionData } from "../../@types/question";
import Chatbot from "../../components/ChatBot";
import TabMenu from "../../components/TabMenu/tabMenu";
import QuestionPanel from "./QuestionPanel";

import CompleteModal from "../../modals/CompleteModal";
import WrongModal from "../../modals/WrongModal";

export default function ExercisePage() {
    const [isTabOpen, setIsTabOpen] = useState<boolean>(false);
    const [questionData, setQuestionData] = useState<QuestionData>();
    const [ isCompleteOpen,setIsCompleteOpen] = useState<boolean>(false);
    const [ isWrongOpen,setIsWrongOpen] = useState<boolean>(false);
    const params = useParams()

    const fetchData = async () => {
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
                console.log(data.data[0]);
                setQuestionData(data.data[0]);
            }
        }
        catch (error) {
            throw error
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
                    />
                </div>

        },
        {
            label: "Topic 2", content:
            <div className="flex flex-col items-center h-fit bg-neutral rounded-lg w-full shadow-sm">
                <Chatbot />
            </div>
                
        }
    ]
    return (
        <div className="flex flex-col">
            { isWrongOpen && <WrongModal setOpen={setIsWrongOpen}/>}
            { isCompleteOpen && <CompleteModal setOpen={setIsCompleteOpen}/>}
            {isTabOpen && (
                <div
                    className="fixed w-full top-[0px] h-full bg-black/50 z-40"
                    onClick={() => setIsTabOpen(false)}
                />
            )}

            <div className="flex h-[50px] px-5">
                <div className="flex items-center w-50">
                    <input type="checkbox" checked={isTabOpen} onChange={() => setIsTabOpen(true)} id="exercise_list" className="hidden peer" />
                    <label htmlFor="exercise_list" className="flex items-center gap-5 text-xl font-bold text-black hover:text-primary hover:cursor-pointer"><GiHamburgerMenu />แบบฝึกหัด</label>
                    <div className="absolute bg-white shadow-sm h-full w-100 top-[0px] -left-full peer-checked:left-0 transition-all z-50">
                        <ul className="flex flex-col justify-center w-full gap-2 px-5 overflow-x-auto">
                            <li className="flex items-center text-2xl font-bold justify-between w-full h-[50px] px-5 border-b">
                                <header> แบบฝึกหัด</header>
                                <input type="checkbox" checked={isTabOpen} onChange={() => setIsTabOpen(false)} id="exercise_list_2" className="hidden peer" />
                                <label htmlFor="exercise_list_2" className="flex items-center gap-5 text-xl font-bold text-black hover:text-primary hover:cursor-pointer"><FaX /></label>
                            </li>
                            <div className="w-full h-full overflow-y-scroll">
                                <li className="hover:bg-neutral rounded-lg w-full p-3">Exercise 1</li>
                                <li className="hover:bg-neutral rounded-lg w-full p-3">Exercise 2</li>
                                <li className="hover:bg-neutral rounded-lg w-full p-3">Exercise 3</li>
                            </div>

                        </ul>
                    </div>
                </div>
            </div>

            <div className="h-fit min-h-fit flex justify-center px-15 gap-15">
                <div className="hidden md:flex bg-white rounded-lg w-[70%] h-[82vh] shadow-sm gap-2 border-4 border-neutral" >
                    <QuestionPanel
                        question_id={questionData?.question_id}
                        title={questionData?.title}
                        question={questionData?.question}
                        setWrongModal={setIsWrongOpen}
                        setCompleteModal={setIsCompleteOpen}
                    />
                </div>


                <div className="hidden md:flex flex-col items-center bg-neutral rounded-lg w-[40%] h-[82vh] shadow-sm">
                    <Chatbot />
                </div>

                <div className="md:hidden flex w-full">
                    <TabMenu tab_data={tab_data} />
                </div>

            </div>
        </div>
    )
}