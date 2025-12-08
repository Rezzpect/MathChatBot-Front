import CourseCard from "../../components/CourseCard";
import { useState } from "react";
import { tempCourseData } from "./TempCourseData";

export default function RecommendedCourse() {
    const enrolledData = tempCourseData;

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
                {enrolledData.map((data) =>
                    <CourseCard
                        course_name={data.course_name}
                        course_description={data.course_description}
                        course_owner={data.course_owner}
                        difficulty={data.difficulty}
                        student_amount={data.student_amount}
                    />
                )}
            </div>
            <a className="font-bold text-primary cursor-pointer">READ MORE</a>
        </div>
    )
}