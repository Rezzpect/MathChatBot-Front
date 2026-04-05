import CourseCard from "../../components/CourseCard";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import type { CourseCardProp } from "../../@types/coursecard";
import supabaseClient from "../../utils/SupabaseClient";
import CourseCardSkeleton from "../../components/Skeletons/CourseCardSkeleton";
import toast from "react-hot-toast";

export default function HomeCourse() {
    const [coursesData, setCoursesData] = useState<CourseCardProp[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const page_size: number = 6;

    const searchCourse = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabaseClient.functions.invoke('search-course', {
                method: "POST",
                body: {
                    query: searchQuery,
                    difficulty: null,
                    current_page: currentPage,
                    page_size: page_size
                }
            })
            if (error) throw error;

            if (data) {
                setCoursesData(data.data.items)
                setTotalPages(data.data.total_pages)
            }
        } catch (error) {
            toast.error('Failed to retrieve courses')
        } finally {
            setIsLoading(false);
        }
    }

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCurrentPage(1);
        if (searchQuery !== '') {
            searchCourse();
        } else {
            fetchData();
        }

    }

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
                setCoursesData(data.data.items);
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
        if (searchQuery !== '') {
            searchCourse();
        } else {
            fetchData();
        }

    }, [currentPage])

    return (
        <div className="flex flex-col items-center justify-center">
            <form onSubmit={handleSearch} className="md:w-[50vw] w-full h-auto my-2 flex items-center gap-2 py-10">
                <input className="rounded-full pl-5 w-full h-[50px] bg-neutral outline-none focus:border focus:border-primary"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type here" />
                <button className="btn-primary w-[50px] h-[50px] text-white btn rounded-full text-l" type='submit'><FaSearch /></button>
            </form>
            <div className="flex justify-center">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full gap-4 overflow-x-hidden scroll-smooth py-5 px-1">
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
                        coursesData && coursesData.map(data => (
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