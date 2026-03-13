import { useContext, useEffect, useState } from "react";

import "./timepicker.css";
import supabaseClient from "../../utils/SupabaseClient";
import { AuthContext } from "../../contexts/authContext";
import type { EventModalProps } from "../../@types/modal";
import { addMinutes, differenceInMinutes, format } from "date-fns";
import type { EventItems } from "../../@types/event";

type CourseSelections = {
    course_id: number,
    course_name: string,
    unfinished_question: number
};

export default function EventModal({
    modalData,
    setOpen,
}: EventModalProps
) {
    const { authData } = useContext(AuthContext)
    const [courseList, setCourseList] = useState<CourseSelections[]>([]);
    const [disableEdit, setDisableEdit] = useState<boolean>(modalData ? true : false);
    const [unFinishedNumber, setUnFinishedNumber] = useState<number>(0);
    const [formData, setFormData] = useState<EventItems>({
        plan_id: 0,
        course_id: 0,
        title: "",
        start: new Date(),
        end: addMinutes(new Date(), 30),
        progress_count: 0,
        question_todo: 0,
        is_completed: true,

    })

    useEffect(() => {
        fetchCourses();

        if (!modalData) return
        console.log(modalData)
        setFormData(modalData);
    }, [])

    const fetchCourses = async () => {
        const { data, error } = await supabaseClient.functions.invoke('planable-course', {
            method: 'POST',
            body: {
                user_id: authData?.user_id
            }
        })

        if (error) throw error
        if (data) console.log(data); setCourseList(data.data);
    }

    const handleSelectCourse = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target
        const target_course = courseList.find((course) => course.course_name === value);

        if (!target_course) return;

        setUnFinishedNumber(target_course?.unfinished_question ?? 0);
        setFormData((prev) => ({ ...prev, course_id: target_course?.course_id, title: value }))
    }

    useEffect(() => {
        document.body.classList.add('overflow-hidden')

        return () => {
            document.body.classList.remove('overflow-hidden')
        }
    }, [])

    return (
        <div className="fixed w-full h-full bg-black/50 top-0 left-0 flex justify-center items-center z-9999">
            <div className="h-fit w-140 bg-base-100 shadow-sm rounded-lg">
                <div className="flex flex-col gap-5 p-5 pt-10 text-neutral-content">
                    <div className="flex flex-col w-full h-fit">
                        <label htmlFor="course-select">คอร์ส</label>
                        <header className="text-xl font-bold">{formData.title}</header>
                    </div>

                    <form className="flex md:flex-row flex-col gap-2 w-full">
                        <div className="flex flex-col w-full">
                            <label htmlFor="start-time">Start Time</label>
                            <input className='border border-neutral outline-none focus:border-primary rounded-lg p-2 w-full h-fit'
                                disabled={disableEdit}
                                value={format(formData.start, "yyyy-MM-dd'T'HH:mm")}
                                onChange={(e) => setFormData((prev) => ({ ...prev, start: new Date(e.target.value) }))}
                                id="start-time"
                                type="datetime-local"
                            />
                        </div>

                        <div className="flex flex-col w-full ">
                            <label htmlFor="end-time">End Time</label>
                            <input className={`border outline-none h-fit rounded-lg p-2 w-full
                                    ${(differenceInMinutes(formData.end, formData.start) < 30) ? 'border-red-500' : 'border-neutral'}
                                `}
                                disabled={disableEdit}
                                value={format(formData.end, "yyyy-MM-dd'T'HH:mm")}
                                onChange={(e) => setFormData((prev) => ({ ...prev, end: new Date(e.target.value) }))}
                                id="end-time"
                                type="datetime-local"
                                min={format(addMinutes(formData.start, 30), "yyyy-MM-dd'T'HH:mm")}
                            />
                        </div>
                    </form>

                    <div className="flex flex-col rounded-lg bg-neutral gap-5 p-5">
                        <div className="flex justify-between">
                            <div className="flex flex-col gap-2">
                                <div className="text-5xl font-bold">
                                    {formData.progress_count} / {formData.question_todo > 0 ? formData.question_todo : '-'}
                                </div>
                                <span className="text-sm">คำถามที่ทำเสร็จแล้ว</span>
                            </div>
                            {!disableEdit &&
                                <div className="flex flex-col">
                                    <label htmlFor="exercise-todo">จำนวนข้อที่จะทำ</label>
                                    <input className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none 
                                border border-neutral h-full w-full p-2 rounded-lg bg-white outline-none
                                focus:border focus:border-primary'
                                        value={formData.question_todo === 0 ? '' : formData.question_todo}
                                        disabled={true}
                                        min={1}
                                        max={999}
                                        placeholder="-"
                                        onChange={(e) => setFormData((prev) => ({ ...prev, question_todo: parseInt(e.target.value) || 0 }))}
                                        id="exercise-todo"
                                        type='number'
                                    />
                                </div>
                            }
                        </div>
                        <progress className="progress progress-primary w-full" value={formData.progress_count} max={formData.question_todo}></progress>
                    </div>



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