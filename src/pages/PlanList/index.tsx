import { MdEdit } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { DayPicker } from "react-day-picker";
import { useContext, useEffect, useState } from "react";

import supabaseClient from "../../utils/SupabaseClient";
import { AuthContext } from "../../contexts/authContext";
import type { ModalProps } from "../../@types/modal";
import { addMinutes, differenceInMinutes, format } from "date-fns";
import type { EventItems } from "../../@types/event";
import { replace, useNavigate, useParams } from "react-router-dom";
import type { CourseData } from "../../@types/courseData";
import { RiArrowGoBackFill } from "react-icons/ri";
import PlanListModal from "../../modals/StudyPlanModal";

type CourseSelections = {
    course_id: number,
    course_name: string,
    unfinished_question: number
};

interface NewEventItems {
    course_name: string,
    topic_name: string,
    topic_id: number,
    start: Date,
    end: Date,
    deadline: number
}

const tempData: NewEventItems[] = [
    {
        course_name: "Mathematics Grade 6",
        topic_name: "Fractions and Decimals",
        topic_id: 1,
        start: new Date("2026-03-01"),
        end: new Date("2026-03-07"),
        deadline: 6
    },
    {
        course_name: "Physics Fundamentals",
        topic_name: "Newton's Laws of Motion",
        topic_id: 2,
        start: new Date("2026-03-03"),
        end: new Date("2026-03-10"),
        deadline: 7
    },
    {
        course_name: "Computer Programming 101",
        topic_name: "Introduction to TypeScript",
        topic_id: 3,
        start: new Date("2026-03-05"),
        end: new Date("2026-03-12"),
        deadline: 7
    },
    {
        course_name: "Data Structures",
        topic_name: "Binary Trees",
        topic_id: 4,
        start: new Date("2026-03-08"),
        end: new Date("2026-03-15"),
        deadline: 7
    },
    {
        course_name: "Linear Algebra",
        topic_name: "Matrix Multiplication",
        topic_id: 5,
        start: new Date("2026-03-10"),
        end: new Date("2026-03-18"),
        deadline: 8
    }
];

export default function PlanListPage({ }
) {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [isPlanListModal, setIsPlanListModal] = useState<boolean>(false);
    const [bannerUrl, setBannerUrl] = useState<string>('https://img.freepik.com/premium-photo/purple-background-simple-empty-backdrop-various-design-works-with-copy-space-text-images_7954-57975.jpg');
    const [courseData, setCourseData] = useState<CourseData>({
        "course_id": 0,
        "course_name": "",
        "course_owner_id": "",
        "course_owner": "",
        "difficulty": "",
        "course_description": null,
        "edit_permission": false,
        "is_published": false,
        "student_amount": 0,
        "created_date": "",
        "updated_date": "",
        "banner_picture": null
    })

    const fetchData = async () => {
        try {
            const { data, error } = await supabaseClient.functions.invoke("course-detail", {
                'body': {
                    "course_id": courseId
                }
            })

            if (error) { throw error }

            if (data) {
                const course_data:CourseData = data.data[0]
                if (!course_data.edit_permission){ 
                    navigate('/') 
                    return 
                }
                setCourseData(data.data[0]);
                const banner_name = data.data[0].banner_picture;
                if (banner_name) getFile(banner_name);

            }
        } catch (error) {
            throw error
        }
    }

    const getFile = async (banner_name: string) => {
        const { data } = supabaseClient.storage.from('course_banner').getPublicUrl(courseId + banner_name);

        if (data) {
            setBannerUrl(data.publicUrl);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="min-h-fit flex flex-col justify-center w-full items-center mb-20">
            {isPlanListModal && <PlanListModal setOpen={setIsPlanListModal}/>}
            <div className="flex flex-col lg:px-50 md:px-20 px-5 w-full h-fit min-h-[500px] gap-5">
                <div className="relative rounded-b-lg w-full h-[12rem] bg-primary overflow-hidden">
                    {
                        bannerUrl && <img src={bannerUrl} className=" absolute h-full w-full" />
                    }
                    <button
                        onClick={() => navigate('/course/'+ courseId)}
                        className="absolute m-5 btn btn-black btn-outline bg-white rounded-full shadow-sm">
                        ย้อนกลับ <RiArrowGoBackFill />
                    </button>
                </div>
                <div className="flex justify-between items-end">
                    <div className="flex flex-col text-primary my-8 gap-3">
                        <header className="md:text-5xl text-4xl font-bold text-shadow-lg">{courseData.course_name}</header>
                        <header className="md:text-xl text-lg font-bold text-shadow-lg">{courseData.course_owner}</header>
                    </div>

                </div>
                <section className="flex justify-between w-full">
                    <header className="text-2xl font-bold">Study Plans</header>
                    <button className="bg-primary text-primary-content p-2 font-bold rounded-lg" onClick={()=>setIsPlanListModal(true)}>Create +</button>
                </section>

                <div className="flex flex-col h-fit gap-2 w-full">
                    {tempData.map((data) => (
                        <div className="flex justify-between border border-neutral rounded-lg p-2 hover:cursor-pointer" onClick={()=>setIsPlanListModal(true)}>
                            <div className="flex flex-col">
                                <header className="line-clamp-1 font-bold">{data.course_name}</header>
                                <p>{data.topic_name}</p>
                            </div>
                            <div>
                                <header className="text-sm font-bold">จำนวนวัน</header>
                                {data.deadline}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}