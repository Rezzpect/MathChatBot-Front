import { FaSearch } from "react-icons/fa";
import RecommendedCourse from "./RecommendedCourse";
import HomeCourse from "./HomeCourse";

export default function HomePage() {

    return (
        <div className="flex flex-col items-center lg:mx-50 md:mx-20 mx-5 gap-10 my-5">

            <div className="flex flex-col w-full my-2 gap-5">
                <header className="text-3xl text-bold">คอร์สที่แนะนำ</header>
                <RecommendedCourse />
            </div>

            <div className="flex flex-col items-center justify-center gap-10">
                <div className="flex flex-col w-full my-2 gap-5">
                    <HomeCourse />
                </div>
            </div>



        </div>
    )
}