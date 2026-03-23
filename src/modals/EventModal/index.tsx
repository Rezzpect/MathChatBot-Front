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
    const [formData, setFormData] = useState<EventItems>({
        course_id: 0,
        title: "",
        topic_id:0,
        topic_name:"",
        start: new Date(),
        end: addMinutes(new Date(), 30),
        progress:{
            total:0,
            completed:0
        }

    })

    useEffect(() => {
        fetchCourses();

        if (!modalData) return
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
        if (data) setCourseList(data.data);
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
                        <header className="text-xl font-bold">{formData.title}</header>
                        <header className="text-lg">{formData.topic_name}</header>
                    </div>

                    <div className="flex md:flex-row flex-col gap-2 w-full">
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
                    </div>

                    <div className="flex flex-col rounded-lg bg-neutral gap-5 p-5">
                        <div className="flex justify-between">
                            <div className="flex flex-col gap-2">
                                <div className="text-5xl font-bold">
                                    {formData.progress.completed} / {formData.progress.total}
                                </div>
                                <span className="text-sm">คำถามที่ทำเสร็จแล้ว</span>
                            </div>
                        </div>
                        <progress className="progress progress-primary w-full" value={formData.progress.completed} max={formData.progress.total}></progress>
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