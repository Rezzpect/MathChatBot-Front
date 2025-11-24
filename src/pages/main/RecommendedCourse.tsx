import CourseCard from "../../components/CourseCard";
import { useState } from "react";

export default function RecommendedCourse() {
    const enrolledData = [
        'bg-primary',
        'bg-secondary',
        'bg-accent',
        'bg-black',
        'bg-red-500',
        'bg-red-500',
        'bg-red-500',
        'bg-red-500',
        'bg-red-500',
        'bg-red-500',
        'bg-red-500',
        'bg-red-500',
        'bg-red-500',
        'bg-red-500',
        'bg-red-500',
        'bg-red-500',
        'bg-red-500',
    ];

    return (
        <div className="flex flex-col justify-center items-center gap-5">
            <div className="grid grid-cols-3 gap-4 items-center">
                    {enrolledData.map((data) =>
                        <CourseCard color={data} />
                    )}
            </div>
            <a className="font-bold text-primary cursor-pointer">READ MORE</a>
        </div>
    )
}