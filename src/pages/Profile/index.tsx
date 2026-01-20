import CourseProgressBar from "../../components/CourseProgressBar";
import StudentStat from "./StudentStat";
import WeeklyExerciseBar from "../../components/WeeklyExerciseChart";

export default function StudentProfile() {
    return (
        <div className="min-h-fit flex justify-center">
            <div className="flex flex-col my-10 w-full min-h-fit mx-25 gap-5">
                <header className="font-bold text-2xl">โปรไฟล์ผู้ใช้</header>
                <div className="flex w-full gap-20">

                    {/* Left Column */}
                    <div className="flex flex-col w-[30%] gap-5">
                        <div className="h-fit bg-base-100 shadow-sm rounded-lg">
                            {/* Banner Image */}
                            <div className="flex justify-center rounded-t-lg w-full h-[130px] bg-primary">
                                <div className="flex justify-center avatar h-full w-full">
                                    {/* Profile Image */}
                                    <div className="absolute w-25 top-10 rounded-full">
                                        <img src="https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp" />
                                    </div>
                                </div>
                            </div>

                            {/* Name and Description */}
                            <div className="flex flex-col gap-5 p-5 text-neutral-content">
                                <div className="flex w-full justify-center">
                                    <header className="font-bold text-lg">พลภัทร จินตธรรม</header>
                                </div>

                                <span className="text-sm">Student | Primary School | 📍Thailand | 📚 KMITL</span>
                            </div>
                        </div>

                        <StudentStat/>
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