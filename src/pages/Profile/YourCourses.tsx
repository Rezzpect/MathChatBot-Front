import CourseCard from "../../components/CourseCard";

export default function YourCourse() {
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
        <div className="flex flex-1 flex-col gap-2 w-full px-5">
            {
                enrolledData.map((color) =>
                    <div className={`flex justify-between w-full h-[100px] ${color} rounded-lg p-3 text-primary-content shrink-0`}>
                        <div>
                            <header className="card-title text-2xl font-bold">คณิตศาสตร์ ป.1</header>
                            <p className="text-l">Wuttipat Rojpetipongsakorn</p>
                        </div>

                        <div>
                            <div className="badge badge-soft badge-primary">Beginner</div>
                        </div>

                    </div>
                )
            }
        </div>

    )
}