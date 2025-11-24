import CourseCard from "../../components/CourseCard";
import { FaFilter } from "react-icons/fa";

export default function SearchCourse() {
    const enrolledData = [
        'bg-primary',
        'bg-secondary',
        'bg-accent',
        'bg-black',
        'bg-red-500',
        'bg-red-500',
        'bg-red-500',
        'bg-red-500',
        'bg-red-500',
        'bg-red-500',
        'bg-red-500',
        'bg-red-500',
        'bg-red-500',
        'bg-red-500',
        'bg-red-500',
        'bg-red-500',
        'bg-red-500',
    ];

    return (
        <div className="flex flex-col justify-center gap-5">
            <div className="flex gap-2 items-center">
                <header className="font-bold text-2xl">
                    ผลลัพธ์การค้นหา
                </header>
                <details className="dropdown">
                    <summary className="btn m-1"><FaFilter /></summary>
                    <div className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        <div className="flex items-center mb-4">
                            <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                id="default-checkbox" type="checkbox" value="" />
                            <label  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
                        </div>
                        <div className="flex items-center">
                            <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                id="checked-checkbox" type="checkbox" value="" />
                            <label  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                        </div>
                    </div>



                </details>
            </div >
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-3 gap-4 items-center">
                    {enrolledData.map((data) =>
                        <CourseCard color={data} />
                    )}
                </div>
            </div>

        </div >
    )
}