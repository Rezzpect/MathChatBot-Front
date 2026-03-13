import { FaBook } from "react-icons/fa"
import StatCard from "../../components/StatCard"

export default function StudentStat() {
    return (
        <div className="flex flex-col gap-5">
            <StatCard title={'คอร์สที่เรียนจบแล้ว'} value={'18'} icon={<FaBook/>}/>
            <StatCard title={'คอร์สที่เรียนจบแล้ว'} value={'18'} icon={<FaBook/>}/>
            <StatCard title={'คอร์สที่เรียนจบแล้ว'} value={'18'} icon={<FaBook/>}/>
        </div>
    )
}