import type { StatCardProps } from "../../@types/statcard";

export default function StatCard({
    title,
    value,
    icon,
}: StatCardProps
) {
    return (
        <div className="flex items-center w-full bg-primary rounded-lg px-5 py-3 gap-5">
            <div className="text-primary-content">
                {icon}
            </div>

            <div>
                <div className="text-sm text-primary-content">{title}</div>
                <div className="font-bold text-3xl text-primary-content">{value}</div>
            </div>

        </div>
    )
}