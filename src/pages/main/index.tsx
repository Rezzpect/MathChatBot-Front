import { FaSearch } from "react-icons/fa";
import EnrolledCourse from "./EnrolledCourse";
import RecommendedCourse from "./RecommendedCourse";

export default function HomePage() {

    return (
        <div className="flex flex-col items-center lg:mx-50 md:mx-20 mx-5 my-10 border">
            <div className="md:w-[50vw] w-full h-auto my-2 flex items-center gap-2">
                <input className="rounded-full pl-5 w-[700px] h-[50px] bg-neutral" type="search" placeholder="Type here" />
                <button className="bg-primary h-[50px] w-[50px] text-white btn rounded-full text-l" type='submit'><FaSearch /></button>
            </div>
            <div className="flex flex-col w-full my-2 gap-5 border ">
                <header className="text-3xl text-bold">คอร์สที่ลงทะเบียน</header>
                <EnrolledCourse />
            </div>
            <div className="flex flex-col w-full my-2 gap-5">
                <header className="text-3xl text-bold">คอร์สเรียนที่แนะนำ</header>
                <RecommendedCourse />
            </div>


        </div>
    )
}