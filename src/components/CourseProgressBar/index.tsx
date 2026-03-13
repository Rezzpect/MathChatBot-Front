import type { ProgressProp } from "../../@types/courseData";

export default function CourseProgressBar({
    course_name,
    progress
}:ProgressProp){
    return (
        <div className="w-full bg-base-300 rounded-lg p-5 items-center">
            <div className="flex">
                <div className="flex flex-col w-full gap-5">
                    <div className="flex gap-5">
                        <header className="font-bold text-lg">{course_name}</header>
                    </div>
                    
                    <progress className="progress progress-primary w-full" value={progress} max={100}/>
                </div>
            </div>
            
        </div>
    )
}