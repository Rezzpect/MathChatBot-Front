export default function ProblemSelectionPage() {
    const exercise_title = "โจทย์ปัญหาบวก ลบ คูณ หาร"
    const exercise_count = [
        1,2,3,4,5,6,7,8,9,10,
        11,12,13,14,15,16,17,18,19,20
    ]
    return (
        <div className="h-[calc(100vh-65px)] min-h-fit flex justify-center">
            <div className="flex flex-col my-20 bg-base-300 rounded-lg w-[1100px] h-fit min-h-[500px] shadow-sm">
                <div className="flex flex-col text-primary-content rounded-t-lg w-full h-[130px] bg-primary p-5 gap-2">
                    <header className="text-3xl font-bold">คณิตสอบแข่ง</header>
                    <header className="text-lg">Wuttipat Rojpetipongsakorn</header>
                </div>

                <div className="flex flex-col flex-1 w-full h-full py-5 px-15 text-neutral-content">
                    <header className="text-xl font-bold pb-10">{exercise_title} ({exercise_count.length} ข้อ)</header>
                    <div className="grid grid-cols-9 gap-5 px-5">
                        {
                            exercise_count.map((ex_id)=>
                                <div className="flex items-center justify-center text-neutral-content w-12 h-12 rounded-full bg-neutral hover:bg-primary hover:text-primary-content hover:cursor-pointer">
                                    <span className="font-bold">{ex_id}</span>
                                </div>
                            )
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}