import { RiArrowGoBackFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import DataTable from "../../components/DataTable";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import supabaseClient from "../../utils/SupabaseClient";
import type { CourseData } from "../../@types/courseData";

export default function LessonPage() {
    const [courseData, setCourseData] = useState<CourseData>({
        "course_id": 0,
        "course_name": "",
        "course_owner_id": "",
        "course_owner": "",
        "difficulty": "",
        "course_description": null,
        "student_amount": 0,
        "created_date": "",
        "updated_date": ""
    })

    const params = useParams();
    const fetchData = async () => {
        const {data,error} = await supabaseClient.functions.invoke("course-detail", {
            'body': {
                "course_id": Number(params.lessonId)
            }
        })
        
        if (data) {
            console.log(data.data[0])
            setCourseData(data.data[0]);
        }
        else {console.log(error)}
    }

    useEffect(()=>{
        fetchData();
    },[]);

    return (
        <div className="h-[calc(100vh-65px)] min-h-fit flex flex-col justify-center items-center">
            <div className="flex rounded-b-lg w-full h-[157px] bg-primary">
                <button className=" m-5 btn btn-black btn-outline bg-white rounded-full shadow-sm">ย้อนกลับ <RiArrowGoBackFill /></button>
            </div>
            <div className="flex flex-col w-[965px] h-fit min-h-[500px]">
                <div className="flex justify-between items-end">
                    <div className="flex flex-col text-primary my-8 gap-3">
                        <header className="text-5xl font-bold text-shadow-lg">{courseData.course_name}</header>
                        <header className="text-xl font-bold text-shadow-lg">{courseData.course_owner}</header>
                    </div>
                    <button className="btn btn-primary rounded-full shadow-sm">ลงทะเบียน<FaPlus /></button>
                </div>

                <div className="flex flex-col bg-base-300 rounded-lg shadow-sm text-base p-5 my-5">
                    <header className="text-2xl font-bold">เกี่ยวกับคอร์ส</header>
                    <span className="px-10 py-5 w-full">{courseData.course_description}</span>
                </div>

                <DataTable name="topic-list-in-course" id_key="course_id" data_id={Number(params.lessonId)} />
            </div>
        </div>
    )
}