import { useState, useEffect } from "react"
import { IoIosArrowDown } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaX } from "react-icons/fa6"
import supabaseClient from "../../utils/SupabaseClient";
import { useParams } from "react-router-dom";
import type { QuestionDataProp } from "../../@types/question";

export default function ExercisePage() {
    const [getMode, setMode] = useState<string>('Hint Mode');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [questionData, setQuestionData] = useState<QuestionDataProp>();
    const mode = ['Hint Mode', 'Theory Mode'];
    const params = useParams()

    const fetchData = async () => {
        const {data,error} = await supabaseClient.functions.invoke("question-detail", {
            'body': {
                "question_id": Number(params.questionId)
            }
        })
        
        if (data) {
            console.log(data.data[0]);
            setQuestionData(data.data[0]);
        }
        else {console.log(error)}
    }

    useEffect(()=>{fetchData()},[])
    return (
        <div className="flex flex-col">
            {isOpen && (
                <div
                    className="fixed w-full h-full bg-black/50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div className="flex h-[50px] px-5">
                <div className="flex items-center w-50">
                    <input type="checkbox" checked={isOpen} onChange={() => setIsOpen(true)} id="exercise_list" className="hidden peer" />
                    <label htmlFor="exercise_list" className="flex items-center gap-5 text-xl font-bold text-black hover:text-primary hover:cursor-pointer"><GiHamburgerMenu />แบบฝึกหัด</label>
                    <div className="absolute bg-white shadow-sm h-full w-100 top-[65px] -left-full peer-checked:left-0 transition-all z-50">
                        <ul className="flex flex-col justify-center w-full gap-2 px-5">
                            <li className="flex items-center text-2xl font-bold justify-between w-full h-[50px] px-5 border-b">
                                <header> แบบฝึกหัด</header>
                                <input type="checkbox" checked={isOpen} onChange={() => setIsOpen(false)} id="exercise_list_2" className="hidden peer" />
                                <label htmlFor="exercise_list_2" className="flex items-center gap-5 text-xl font-bold text-black hover:text-primary hover:cursor-pointer"><FaX /></label>
                            </li>
                            <li className="hover:bg-neutral rounded-lg w-full p-3">Exercise 1</li>
                            <li className="hover:bg-neutral rounded-lg w-full p-3">Exercise 2</li>
                            <li className="hover:bg-neutral rounded-lg w-full p-3">Exercise 3</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="h-fit min-h-fit flex justify-center px-15 gap-15">
                <div className="flex flex-col bg-white rounded-lg w-[60%] h-150 shadow-sm gap-2 border-4 border-neutral" >
                    <div className="m-5 h-full overflow-y-auto">
                        <header className="font-bold text-2xl">{questionData?.title}</header>
                        <p>{questionData?.question}</p>
                        <div className="flex justify-center w-full">
                            <img className="flex w-50 h-50 justify-center" src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"></img>
                        </div>
                    </div>

                    <div className="flex bg-neutral rounded-t-lg w-full p-2 mt-2">
                        <input className="input focus:outline-none rounded-full w-full" placeholder="write your answer here"></input>
                        <button className="btn btn-primary text-primary-content rounded-full">ส่งคำตอบ</button>
                    </div>
                </div>

                <div className="flex flex-col items-center bg-neutral rounded-lg w-[40%] h-150 shadow-sm">
                    <div className="flex justify-between my-1 px-2 w-full items-center">
                        <div className="dropdown dropdown-start">

                            <div tabIndex={0} role="button" className="flex font-bold items-center gap-2 m-1 hover:cursor-pointer hover:bg-base-300 p-2 rounded-lg">
                                <header>{getMode}</header><IoIosArrowDown />
                            </div>
                            <ul tabIndex={-1} className="dropdown-content font-bold menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                {mode.map((mode_name) =>
                                    <li><a onClick={()=>setMode(mode_name)}>{mode_name}</a></li>
                                )}
                            </ul>
                        </div>
                        <header className="font-bold">Math Chatbot</header>
                    </div>

                    <div className="bg-white rounded-lg h-[80%] w-full border-1 border-neutral">

                    </div>

                    <div className="flex items-center h-[10%] w-full gap-2 px-2">
                        <input type="text" placeholder="Type here" className="input rounded-full w-full focus:outline-none" />
                        <button className="btn rounded-full btn-primary text-primary-content">Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}