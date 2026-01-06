import CourseCard from "../../components/CourseCard";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { CourseCardProp } from "../../@types/coursecard";
import supabaseClient from "../../utils/SupabaseClient";

export default function EnrolledCourse() {
    const [cardIndex, setCardIndex] = useState<number>(0);
    const [enrolledData, setEnrolledData] = useState<Array<CourseCardProp>>([])

    const fetchData = async () => {
        const {data,error} = await supabaseClient.functions.invoke('home-courses', {
            method: 'GET',
        })
        if (data) {
            setEnrolledData(data.data);
        }else {console.log(error)}
    }

    useEffect(() => {
        fetchData();
    }, [])

    const goNext = () => {
        if (enrolledData.length - cardIndex > 3) {
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
                    {enrolledData.map((data,) =>
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
                <div className="absolute inset-y-0 right-0 w-50 bg-gradient-to-l from-base-100 z-50"></div>
            </div>
            <button className="border border-red-500 text-3xl cursor-pointer" onClick={goNext}><FaChevronRight /></button>
        </div>
    )
}