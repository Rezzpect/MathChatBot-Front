import CourseProgressBar from "../../components/CourseProgressBar";
import StudentStat from "./StudentStat";
import WeeklyExerciseBar from "../../components/WeeklyExerciseChart";
import { useState } from "react";
import EditProfileModal from "../../modals/EditProfile";

export default function StudentProfile() {
    const [isEditProf,setIsEditProf] = useState<boolean>(false);

    return (
        <div className="flex justify-center">

            {isEditProf && <EditProfileModal setOpen={setIsEditProf}/>}
            <div className="flex flex-col my-10 w-full min-h-fit mx-25 gap-5">
                <header className="font-bold text-2xl">โปรไฟล์ผู้ใช้</header>
                <div className="flex w-full gap-20">

                    {/* Left Column */}
                    <div className="flex flex-col w-[30%] gap-5">
                        <div className="h-fit bg-base-100 shadow-sm rounded-lg">
                            {/* Banner Image */}
                            <div className="relative flex justify-center rounded-t-lg w-full h-[130px] bg-primary">
                                {/* Profile Image */}
                                <div className="flex justify-center avatar absolute w-[100px] bottom-[-30px] ">
                                    <div className="rounded-full">
                                        <img src="https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp" />
                                    </div>
                                </div>
                            </div>

                            {/* Name and Description */}
                            <div className="flex flex-col gap-5 p-5 pt-10 text-neutral-content">
                                <div className="flex w-full justify-center">
                                    <header className="font-bold text-lg">พลภัทร จินตธรรม</header>
                                </div>

                                <span className="text-sm break-words">Student | Primary School | 📍Thailand | 📚 KMITL</span>
                                <div className="flex w-full justify-end">
                                    <button onClick={()=>{setIsEditProf(true)}}className="rounded-full bg-primary text-primary-content hover:cursor-pointer p-2">Edit Profile</button>
                                </div>
                            </div>
                        </div>

                        <StudentStat />
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-5 w-[70%]">
                        <div className="flex flex-col w-full bg-base-100 shadow-sm rounded-lg p-10 gap-5">
                            <header className="font-bold text-xl">คอร์สล่าสุด</header>
                            <div className="flex flex-col gap-5">
                                <CourseProgressBar />
                                <CourseProgressBar />
                                <CourseProgressBar />
                            </div>
                        </div>

                        <div className="flex flex-col justify-center rounded-lg shadow-sm bg-base-100 p-5 gap-5">
                            <header className="font-bold text-xl">เวลาเรียนในสัปดาห์นี้</header>

                            <WeeklyExerciseBar />
                        </div>
                    </div>


                </div>

            </div>
        </div>
    )
}