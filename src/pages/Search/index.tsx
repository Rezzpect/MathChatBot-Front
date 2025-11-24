import { FaSearch } from "react-icons/fa";
import SearchCourse from "./SearchCourse";

export default function SearchPage() {
    return (
        <div className="flex flex-col items-center border m-t border-red-500 m-10">
            <div className="border border-red-500 w-[600px] h-auto my-2 flex items-center gap-2">
                <input className="rounded-full pl-5 w-[700px] h-[50px] bg-neutral" type="search" placeholder="Type here" />
                <button className="bg-primary h-[50px] w-[50px] text-white btn rounded-full text-l" type='submit'><FaSearch /></button>
            </div>

            <div className="flex flex-col w-250 border my-10 border-red-500 gap-5">
                <SearchCourse/>
            </div>
            
            
        </div>
    )
}