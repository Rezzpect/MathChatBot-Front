import CourseCard from "../../components/CourseCard";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { CourseCardProp } from "../../@types/coursecard";
import supabaseClient from "../../utils/SupabaseClient";
import { temp_course } from "./tempdata";
import { useRef } from "react";
import CourseCardSkeleton from "../../components/Skeletons/CourseCardSkeleton";

export default function HomeCourse() {
    const [enrolledData, setEnrolledData] = useState<CourseCardProp[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const page_size: number = 6;

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabaseClient.functions.invoke('course-list', {
                method: 'POST',
                body: {
                    "current_page": currentPage,
                    "page_size": page_size
                }
            })
            if (error) {
                throw error
            }

            if (data) {
                console.log(data.data)
                setEnrolledData(data.data.items);
                setTotalPages(data.data.total_pages);
            }

        } catch (error) {
            throw error
        }
        setIsLoading(false);
    }

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    useEffect(() => {
        fetchData();
        // setEnrolledData(temp_course)
    }, [currentPage])

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
        <div className="flex flex-col">
            <div className="flex w-full items-center gap-5">
                <div className="grid grid-cols-3 grid-row-2 w-full gap-4 overflow-x-hidden scroll-smooth py-5 px-1">
                    {isLoading ?

                        <>
                            <CourseCardSkeleton />
                            <CourseCardSkeleton />
                            <CourseCardSkeleton />
                            <CourseCardSkeleton />
                            <CourseCardSkeleton />
                            <CourseCardSkeleton />
                        </>
                        :
                        enrolledData && enrolledData.map(data => (
                            <CourseCard
                                key={data.course_id}
                                {...data}
                            />
                        ))
                    }
                </div>
            </div>

            <div className="flex items-center justify-center mb-5">
                <div className="flex join justify-center items-center gap-2 font-bold">
                    <button className="join-item w-fit h-fit hover:cursor-pointer p-3 disabled:cursor-default disabled:border-0"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1 || totalPages === 1}
                    >«</button>

                    {[...Array(totalPages)].map((_, index) => {
                        const pageNum = index + 1;
                        return (
                            <button
                                key={`page-${pageNum}`}
                                className={`join-item text-xs rounded-lg h-7 w-7 ${currentPage === pageNum
                                    ? 'bg-primary text-primary-content'
                                    : 'hover:cursor-pointer hover:bg-primary hover:text-primary-content'
                                    }`}
                                onClick={() => handlePageChange(pageNum)}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    <button className="join-item w-fit h-fit hover:cursor-pointer p-3 disabled:cursor-default disabled:border-0"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 1}
                    >»</button>
                </div>
            </div>
        </div>

    )
}