export default function CourseProgressBar(){
    return (
        <div className="w-full bg-base-300 rounded-lg p-5 items-center">
            <div className="flex">
                <div className="flex flex-col w-full">
                    <div className="flex gap-5">
                        <header className="font-bold text-lg">คณิต ป.1</header>
                        <span className="text-lg">John Doe</span>
                    </div>
                    
                    <progress className="progress progress-primary w-full" value={40} max={100}/>
                </div>
            </div>
            
        </div>
    )
}