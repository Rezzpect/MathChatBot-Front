import { FaUser } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import type { CourseCardProp } from "../../@types/coursecard";

export default function CourseCard({color}:CourseCardProp) {
    return (
        <div className={`card ${color} text-neutral-content w-[300px] h-[250px] flex-shrink-0 card-sm shadow-sm`}>
            <div className="card-body text-primary-content p-5">
                <header className="card-title text-2xl font-bold">คณิตศาสตร์ ป.1</header>
                <p className="text-l">Wuttipat Rojpetipongsakorn</p>
            </div>
            <div className="bg-white rounded-b-lg h-[145px] flex flex-col text-2xl p-2">
                <div className="badge badge-soft badge-primary">Beginner</div>
                <p className="card-body">        เป็นรายวิชาคณิตศาสตร์ระดับประถมศึกษาปีที่ 1 
                    เน้นพื้นฐานการนับเลข การบวก ลบ จำนวนเต็ม การเปรียบเทียบจำนวน 
                    รูปร่างเรขาคณิตเบื้องต้น และการแก้ปัญหาง่าย ๆ เพื่อ...
                </p>
                <div className="flex justify-end text-sm items-center gap-2"> 
                        <div className="flex text-sm items-center gap-1">
                            <div><FaUser /></div>
                            <span>2500 คน</span>
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