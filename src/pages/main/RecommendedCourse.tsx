import CourseCard from "../../components/CourseCard";
import { useState, useEffect } from "react";
import supabaseClient from "../../utils/SupabaseClient";
import type { CourseCardProp } from "../../@types/coursecard";

export default function RecommendedCourse() {
    const [recommendData, setRecommendData] = useState<Array<CourseCardProp>>([])
    // const enrolledData = tempCourseData;
    const fetchData = async () => {
        const data = await supabaseClient.functions.invoke('home-courses', {
            method: 'GET',
        })
        setRecommendData(data.data.data);
    }


    useEffect(() => {
        fetchData();
    }, [])

    // const enrolledData = [
    //     'bg-primary',
    //     'bg-secondary',
    //     'bg-accent',
    //     'bg-black',
    //     'bg-red-500',
    //     'bg-red-500',
    //     'bg-red-500',
    //     'bg-red-500',
    //     'bg-red-500',
    //     'bg-red-500',
    //     'bg-red-500',
    //     'bg-red-500',
    //     'bg-red-500',
    //     'bg-red-500',
    //     'bg-red-500',
    //     'bg-red-500',
    //     'bg-red-500',
    // ];

    return (
        <div className="flex flex-col justify-center items-center gap-5">
            <div className="grid grid-cols-3 gap-4 items-center">
                {recommendData?.map((data) =>
                <div key={`card-key-${data.course_id}`}>
                    <CourseCard
                        course_id={data.course_id}
                        course_name={data.course_name}
                        course_description={data.course_description}
                        course_owner={data.course_owner}
                        difficulty={data.difficulty}
                        student_amount={data.student_amount}
                    />
                </div>
                )}
            </div>
            <a className="font-bold text-primary cursor-pointer">READ MORE</a>
        </div>
    )
}