import CourseCard from "../../components/CourseCard";
import { useState, useEffect, useRef } from "react";
import supabaseClient from "../../utils/SupabaseClient";
import type { CourseCardProp } from "../../@types/coursecard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CourseCardSkeleton from "../../components/Skeletons/CourseCardSkeleton";

export default function RecommendedCourse() {
    const [enrolledData, setEnrolledData] = useState<Array<CourseCardProp>>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabaseClient.functions.invoke('recommend-course', {
                method: 'GET',
            })
            if (error) {
                throw error
            }

            if (data) {
                setEnrolledData(data.data);
            }

        } catch (error) {
            throw error
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
        // setEnrolledData(temp_course)
    }, [])

    const containerRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: "left" | "right") => {
        const container = containerRef.current
        if (!container) return

        const cardWidth = container.firstElementChild?.clientWidth ?? 0
        const gap = 16 // gap-4 = 16px

        container.scrollBy({
            left: direction === "left"
                ? -(cardWidth + gap)
                : cardWidth + gap,
            behavior: "smooth",
        })
    }

    return (
        <div className="flex w-full items-center gap-5">
            <button
                className="hover:cursor-pointer hover:brightness-90 bg-primary text-primary-content rounded-full p-2 text-3xl"
                onClick={() => scroll("left")}
            >
                <FaChevronLeft />
            </button>

            {isLoading ?
                <div className="flex w-full gap-4 overflow-x-hidden scroll-smooth py-5 px-1">
                    <CourseCardSkeleton />
                    <CourseCardSkeleton />
                    <CourseCardSkeleton />
                    <CourseCardSkeleton />
                    <CourseCardSkeleton />
                </div>
                : <div
                    ref={containerRef}
                    className="flex w-full gap-4 overflow-x-hidden scroll-smooth py-5 px-1">
                    {enrolledData.map(data => (
                        <CourseCard
                            key={data.course_id}
                            {...data}
                        />
                    ))}
                </div>

            }

            <button
                className="hover:cursor-pointer hover:brightness-90 bg-primary text-primary-content rounded-full p-2 text-3xl"
                onClick={() => scroll("right")}
            >
                <FaChevronRight />
            </button>
        </div>
    )
}