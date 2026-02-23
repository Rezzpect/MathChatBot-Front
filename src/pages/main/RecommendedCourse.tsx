import CourseCard from "../../components/CourseCard";
import { useState, useEffect } from "react";
import supabaseClient from "../../utils/SupabaseClient";
import type { CourseCardProp } from "../../@types/coursecard";
import CourseCardSkeleton from "../../components/Skeletons/CourseCardSkeleton";

export default function RecommendedCourse() {
    const [recommendData, setRecommendData] = useState<Array<CourseCardProp>>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const enrolledData = tempCourseData;
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const {data,error} = await supabaseClient.functions.invoke('home-courses', {
                method: 'GET',
            })

            if (error) {
                throw error
            }

            if(data) {
                setRecommendData(data.data.data);
            }
            
        }catch(error){
            throw error
        }
        setIsLoading(false);
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
            {isLoading ?
                <div className="grid md:grid-cols-3 grid-cols-1 gap-4 items-center border border-accent">
                    <CourseCardSkeleton />
                    <CourseCardSkeleton />
                    <CourseCardSkeleton />
                    <CourseCardSkeleton />
                    <CourseCardSkeleton />
                    <CourseCardSkeleton />
                </div>
                : <div className="grid md:grid-cols-3 grid-cols-1 gap-4 items-center">
                    {recommendData?.map((data) =>
                        <CourseCard
                            course_id={data.course_id}
                            course_name={data.course_name}
                            course_description={data.course_description}
                            course_owner={data.course_owner}
                            difficulty={data.difficulty}
                            student_amount={data.student_amount}
                            key={`card-key-${data.course_id}`}
                        />
                    )}
                </div>
            }
            <a className="font-bold text-primary cursor-pointer">READ MORE</a>
        </div>
    )
}