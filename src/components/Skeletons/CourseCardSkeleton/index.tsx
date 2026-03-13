export default function CourseCardSkeleton() {

    return (
        <div className={`card hover:cursor-pointer bg-primary text-neutral-content w-[300px] h-[250px] flex-shrink-0 card-sm shadow-sm`}>
            <div className="flex justify-between align-middle card-body text-primary-content p-5">
                <span className="loading loading-spinner loading-xl"></span>
            </div>
            <div className="bg-white rounded-b-lg h-[120px] flex flex-col text-2xl p-2">
            </div>
        </div>
    )
}