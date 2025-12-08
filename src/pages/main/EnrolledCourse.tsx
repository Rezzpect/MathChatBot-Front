import CourseCard from "../../components/CourseCard";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { tempCourseData } from "./TempCourseData";

export default function EnrolledCourse() {
    const [cardIndex, setCardIndex] = useState<number>(0);

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

    const goNext = () => {
        if (enrolledData.length-cardIndex>3){
            setCardIndex((prev) => (prev + 1));
        }
        console.log(cardIndex);
    }
    const goPrev = () => {
        if (cardIndex > 0) {
            setCardIndex((prev) => (prev - 1));
        }
        console.log(cardIndex);
    }

    return (
        <div className="flex w-full items-center">
            <button className="text-3xl cursor-pointer" onClick={goPrev}><FaChevronLeft /></button>
            <div className="relative overflow-hidden py-5 h-full">
                <div className={`flex gap-4 transition-transform`}
                    style={{
                        transform: `translateX(-${cardIndex * 316}px)` // card + 4*(gap size)
                    }}
                >
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
                 <div className="absolute inset-y-0 right-0 w-50 bg-gradient-to-l from-base-100 z-50"></div>
            </div>
            <button className="border border-red-500 text-3xl cursor-pointer" onClick={goNext}><FaChevronRight /></button>
        </div>
    )
}