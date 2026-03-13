import { useContext, useEffect, useState } from "react";

import supabaseClient from "../../utils/SupabaseClient";
import { AuthContext } from "../../contexts/authContext";
import type { ModalProps } from "../../@types/modal";
import { addMinutes, differenceInMinutes, format } from "date-fns";
import type { EventItems } from "../../@types/event";

type TopicSelections = {
    topic_id: number,
    topic_name: string,
};

export default function PlanListModal({
    setOpen,
}: ModalProps
) {
    const { authData } = useContext(AuthContext)
    const [topicList, setTopicList] = useState<TopicSelections[]>([]);
    // const [disableEdit, setDisableEdit] = useState<boolean>(modalData ? true : false);
    const [unFinishedNumber, setUnFinishedNumber] = useState<number>(0);
    const [formData, setFormData] = useState<EventItems>({
        plan_id: 0,
        course_id: 0,
        title: "เลือกหัวข้อที่ต้องการ",
        start: new Date(),
        end: addMinutes(new Date(), 30),
        progress_count: 0,
        question_todo: 0,
        is_completed: true,

    })

    useEffect(() => {
        fetchTopic();

        // if (!modalData) return
        // console.log(modalData)
        // setFormData(modalData);
    }, [])

    const fetchTopic = async () => {
        const { data, error } = await supabaseClient.functions.invoke('planable-course', {
            method: 'POST',
            body: {
                user_id: authData?.user_id
            }
        })

        if (error) throw error
        if (data) console.log(data); setTopicList(data.data);
    }

    const handleSelectCourse = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target
        const target_course = topicList.find((topic) => topic.topic_name === value);

        if (!target_course) return;

        setFormData((prev) => ({ ...prev, course_id: target_course?.topic_id, title: value }))
    }

    useEffect(() => {
        document.body.classList.add('overflow-hidden')

        return () => {
            document.body.classList.remove('overflow-hidden')
        }
    }, [])

    return (
        <div className="fixed w-full h-full bg-black/50 top-0 left-0 flex justify-center items-center z-9999">
            <div className="h-fit w-full max-w-120 bg-base-100 shadow-sm rounded-lg">
                <div className="flex flex-col gap-5 p-5 pt-10 text-neutral-content">
                    <header className="font-bold text-2xl">สร้างแผนการเรียน</header>
                    <form className="flex flex-col w-full h-fit">
                        <label htmlFor="course-select">หัวข้อ</label>
                        <select id="course-select" onChange={(e) => handleSelectCourse(e)} value={formData.title} className="select outline-none! w-full select-neutral focus:select-primary">
                            <option disabled={true}>เลือกคอร์สที่ต้องการ</option>
                            {
                                topicList && topicList.map((topic) => (
                                    <option
                                        id={`option-${topic.topic_id}`}
                                        value={topic.topic_name}
                                    >
                                        {topic.topic_name}
                                    </option>
                                ))
                            }
                        </select>
                        <div className="flex flex-col">
                            <label htmlFor="exercise-todo">จำนวนข้อที่จะทำ</label>
                            <input className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none 
                                border border-neutral h-full w-full p-2 rounded-lg bg-white outline-none
                                focus:border focus:border-primary'
                                value={formData.question_todo === 0 ? '' : formData.question_todo}
                                min={1}
                                max={999}
                                placeholder="-"
                                onChange={(e) => setFormData((prev) => ({ ...prev, question_todo: parseInt(e.target.value) || 0 }))}
                                id="exercise-todo"
                                type='number'
                            />
                        </div>
                    </form>



                    <div className="w-full flex justify-end">
                        <button
                            onClick={() => { setOpen(false) }}
                            className="hover:cursor-pointer rounded-full bg-white border border-black text-black font-bold text-lg py-2 px-5">Close
                        </button>
                    </div>
                </div>


            </div>
        </div>
    )
}