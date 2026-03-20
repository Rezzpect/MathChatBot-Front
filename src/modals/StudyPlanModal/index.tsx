import { useContext, useEffect, useState } from "react";

import supabaseClient from "../../utils/SupabaseClient";
import { AuthContext } from "../../contexts/authContext";
import type { ModalProps, PlanlistModalProps } from "../../@types/modal";
import { useParams } from "react-router-dom";
import type { PlanData } from "../../@types/studyplan";
import toast from "react-hot-toast";

type TopicSelections = {
    topic_id: number,
    topic_name: string,
};

export default function PlanListModal({
    modalData,
    setRefresh,
    setOpen,
}: PlanlistModalProps
) {
    const params = useParams();
    const [topicList, setTopicList] = useState<TopicSelections[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<Partial<PlanData>>({
        course_id: Number(params.courseId),
        topic_id: 0,
        start_day: 0,
        day_todo: 0,
    })

    useEffect(() => {
        if (modalData) {
            setFormData({
                course_id: modalData.course_id,
                topic_id: modalData.topic_id,
                start_day: modalData.start_day,
                day_todo: modalData.day_todo
            })
        }
        fetchTopic();
    }, [])

    const fetchTopic = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabaseClient.functions.invoke('planable-topic', {
                method: 'POST',
                body: {
                    course_id: params.courseId
                }
            })

            if (error) throw error
            if (data) console.log(data); setTopicList(data.data);
        } catch (error) {
            toast.error('Enable to retrive available topic')
            setOpen(false);
        } finally {
            setIsLoading(false);
        }

    }

    const handleSelectCourse = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target
        setFormData((prev) => ({ ...prev, topic_id: Number(value) }));
    }

    const createPlan = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabaseClient.functions.invoke('create-study-plan', {
                method: 'POST',
                body: {
                    course_id: formData.course_id,
                    topic_id: formData.topic_id,
                    start_day: formData.start_day,
                    day_todo: formData.day_todo
                }
            })

            if (error) throw error;

            if (data) {
                console.log('create', data);
                toast.success("Created study plan successfully")
                setRefresh((prev) => prev + 1)
                setOpen(false);
            };
        } catch (error) {
            toast.error('Failed to create study plan')
        } finally {
            setIsLoading(false);
        }
    }

    const editPlan = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabaseClient.functions.invoke('edit-study-plan', {
                method: 'PUT',
                body: {
                    course_id: formData.course_id,
                    old_topic_id: modalData?.topic_id,
                    new_topic_id: formData.topic_id !== modalData?.topic_id ? formData.topic_id : null,
                    start_day: formData.start_day,
                    day_todo: formData.day_todo
                }
            })

            if (error) throw error;

            if (data) {
                console.log('edit', data);
                toast.success("Created study plan successfully")
                setRefresh((prev) => prev + 1)
                setOpen(false);
            };
        } catch (error) {
            toast.error('Failed to create study plan')
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        document.body.classList.add('overflow-hidden')

        return () => {
            document.body.classList.remove('overflow-hidden')
        }
    }, [])

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (modalData) {
            editPlan();
        } else createPlan();
    }

    return (
        <div className="fixed w-full h-full bg-black/50 top-0 left-0 flex justify-center items-center z-9999">
            <div className="h-fit w-full max-w-120 bg-base-100 shadow-sm rounded-lg">
                <div className="flex flex-col gap-5 p-5 pt-10 text-neutral-content">
                    <header className="font-bold text-2xl">{modalData ? 'แก้ไข' : 'สร้าง'}แผนการเรียน</header>
                    <form className="flex flex-col w-full h-fit gap-2" onSubmit={handleSave}>
                        <label htmlFor="course-select">หัวข้อ</label>
                        <select
                            id="course-select"
                            onChange={(e) => handleSelectCourse(e)}
                            value={formData.topic_id}
                            disabled={isLoading}
                            className="select outline-none! w-full select-neutral rounded-lg focus:select-primary">
                            <option disabled={true} value={0}>เลือกคอร์สที่ต้องการ</option>
                            {
                                modalData &&
                                <option
                                    disabled={true}
                                    id={`option-${modalData.topic_id}`}
                                    value={modalData.topic_id}>
                                    {modalData.topic_name}
                                </option>
                            }
                            {
                                topicList && topicList.map((topic) => (
                                    <option
                                        id={`option-${topic.topic_id}`}
                                        value={topic.topic_id}
                                    >
                                        {topic.topic_name}
                                    </option>
                                ))
                            }
                        </select>
                        <div className="flex flex-col">
                            <label htmlFor="exercise-todo">วันที่จะให้เริ่มหลังจากลงทะเบียน</label>
                            <input className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none 
                                border border-neutral h-full w-full p-2 rounded-lg bg-white outline-none
                                focus:border focus:border-primary'
                                value={formData.start_day === 0 ? '' : formData.start_day}
                                min={0}
                                max={99}
                                placeholder="-"
                                onChange={(e) => setFormData((prev) => ({ ...prev, start_day: parseInt(e.target.value) || 0 }))}
                                id="exercise-todo"
                                type='number'
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <label htmlFor="exercise-todo">จำนวนวันก่อนหมดเขต</label>
                            <input className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none 
                                border border-neutral h-full w-full p-2 rounded-lg bg-white outline-none
                                focus:border focus:border-primary'
                                value={formData.day_todo === 0 ? '' : formData.day_todo}
                                min={0}
                                max={99}
                                placeholder="-"
                                onChange={(e) => setFormData((prev) => ({ ...prev, day_todo: parseInt(e.target.value) || 0 }))}
                                id="exercise-todo"
                                type='number'
                                disabled={isLoading}
                            />
                        </div>
                        <div className="w-full flex justify-end gap-2 pt-3">
                            <button
                                onClick={() => { setOpen(false) }}
                                disabled={isLoading}
                                className="btn btn-white border border-black rounded-full text-black font-bold text-lg py-2 px-5">Close
                            </button>
                            <button
                                type='submit'
                                disabled={isLoading}
                                className="btn btn-primary rounded-full text-primary-content font-bold text-lg py-2 px-5">{isLoading ? <span className="loading loading-spinner text-primary-content" /> : <>Save</>}
                            </button>
                        </div>
                    </form>




                </div>


            </div>
        </div>
    )
}