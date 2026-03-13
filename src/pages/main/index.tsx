import { FaSearch } from "react-icons/fa";
import RecommendedCourse from "./RecommendedCourse";
import HomeCourse from "./HomeCourse";

export default function HomePage() {

    return (
        <div className="flex flex-col items-center lg:mx-50 md:mx-20 mx-5 gap-20 my-5">

            <div className="flex flex-col w-full my-2 gap-5">
                <header className="text-3xl text-bold">คอร์สที่แนะนำ</header>
                <RecommendedCourse />
            </div>

            <div className="flex flex-col items-center justify-center gap-10">
                <div className="md:w-[50vw] w-full h-auto my-2 flex items-center gap-2">
                    <input className="rounded-full pl-5 w-[700px] h-[50px] bg-neutral" type="search" placeholder="Type here" />
                    <button className="bg-primary h-[50px] w-[50px] text-white btn rounded-full text-l" type='submit'><FaSearch /></button>
                </div>
                <div className="flex flex-col w-full my-2 gap-5">
                    <HomeCourse />
                </div>
            </div>



        </div>
    )
}