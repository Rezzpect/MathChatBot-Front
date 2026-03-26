import { FaUser } from "react-icons/fa";
import type { CourseCardProp } from "../../@types/coursecard";
import { useNavigate } from "react-router-dom";
import supabaseClient from "../../utils/SupabaseClient";
import { useEffect, useState } from "react";

export default function CourseCard({
    course_id,
    course_name,
    course_owner,
    difficulty,
    course_description,
    student_amount,
    banner_picture,
}
    : CourseCardProp) {

    const navigate = useNavigate();
    const [bannerUrl, setBannerUrl] = useState<string>('')

    const getFile = async () => {
        if (!banner_picture) return
        else {
            const { data } = supabaseClient.storage.from('course_banner').getPublicUrl(course_id + banner_picture,)

            if (data) setBannerUrl(data.publicUrl);
        }
    }

    useEffect(() => {
        getFile()
    }, [])

    return (
        <div className={`card hover:cursor-pointer hover:translate-y-[-4px] overflow-hidden bg-white primary text-neutral-content w-[300px] h-[250px] flex-shrink-0 card-sm shadow-sm`}
            onClick={() => navigate(`/course/${course_id}`)}
        >
            <div className="flex flex-col relative bg-primary justify-between align-middle card-body text-primary-content p-5 overflow-hidden">

                {
                    banner_picture &&
                    <>
                        <span className="absolute bg-primary/70 top-0 left-0 z-1 w-full h-full" />
                        <img src={bannerUrl === ''? undefined:bannerUrl} className="absolute h-full w-full top-0 left-0 bg-rp" />
                    </>
                }
                <header className="text-lg font-bold h-full line-clamp-2 max-h-[60px] z-1">{course_name}</header>
                <p className="text-md z-1">{course_owner}</p>
            </div>
            <div className="rounded-b-lg h-[120px] flex flex-col text-2xl p-2">
                <div className="badge badge-soft badge-primary">{difficulty}</div>

                <p className="text-sm m-2 line-clamp-2">{course_description}</p>

                <div className="absolute right-2 bottom-2 flex justify-end text-sm items-center gap-2">
                    <div className="flex text-sm items-center gap-1">
                        <div><FaUser /></div>
                        <span>{student_amount}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}