import { FaUser } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import type { CourseCardProp } from "../../@types/coursecard";

export default function CourseCard({
    course_name,
    course_owner,
    difficulty,
    course_description,
    student_amount }
    : CourseCardProp) {
    return (
        <div className={`card bg-primary text-neutral-content w-[300px] h-[250px] flex-shrink-0 card-sm shadow-sm`}>
            <div className="card-body text-primary-content p-5">
                <header className="card-title text-2xl font-bold">{course_name}</header>
                <p className="text-l">{course_owner}</p>
            </div>
            <div className="bg-white rounded-b-lg h-[145px] flex flex-col text-2xl p-2">
                <div className="badge badge-soft badge-primary">{difficulty}</div>

                <p className="card-body">{course_description}</p>

                <div className="flex justify-end text-sm items-center gap-2">
                    <div className="flex text-sm items-center gap-1">
                        <div><FaUser /></div>
                        <span>{student_amount}</span>
                    </div>
                    <div className="flex text-sm items-center gap-1">
                        <div><FaClock /></div>
                        <span>25 ชั่วโมง</span>
                    </div>
                </div>
            </div>
        </div>
    )
}