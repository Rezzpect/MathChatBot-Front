import YourCourses from "./YourCourses";

export default function StudentProfile() {
    return (
        <div className="h-[calc(100vh-65px)] min-h-fit flex justify-center">
            <div className="flex flex-col my-20 bg-base-300 rounded-lg w-[1100px] h-fit min-h-[500px] shadow-sm">
                <div className="flex rounded-t-lg w-full h-[130px] bg-primary">
                    <div className="relative avatar w-[25%] h-auto">
                        <div className="absolute -top-15 left-15 w-40 rounded-full" >
                            <img src="https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 py-5 text-primary-content">
                        <span className="font-bold text-2xl">พลภัทร จินตธรรม</span>
                        <span className="text-sm">Student | Primary School | 📍Thailand | 📚 KMITL</span>
                    </div>
                </div>

                <div className="flex flex-1 w-full h-full p-5">
                    <div className="flex flex-col w-[25%] gap-2 px-5">
                        <div className="bg-secondary w-full h-[60px] rounded-lg">

                        </div>
                        <div className="flex gap-2">
                            <div className="bg-secondary w-[50%] h-[60px] rounded-lg">

                            </div>
                            <div className="bg-secondary w-[50%] h-[60px] rounded-lg">

                            </div>
                        </div>

                    </div>

                    <div className="divider divider-horizontal divider-grey-800"></div>

                    <div className="w-[70%]">
                        <header className="text-neutral-content text-2xl font-bold pb-5">หลักสูตรของฉัน</header>
                        <YourCourses />
                    </div>
                </div>
            </div>
        </div>
    )
}