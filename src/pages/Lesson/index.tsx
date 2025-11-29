import { RiArrowGoBackFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import DataTable from "../../components/DataTable/datatable";

export default function LessonPage() {
    const data = [
        {
            title: "โจทย์ปัญหาการคูณ",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            exerciseCount: "23 ข้อ",
            status: "เสร็จ"
        },
        {
            title: "โจทย์ปัญหาการบวก",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            exerciseCount: "15 ข้อ",
            status: "กำลังทำ"
        },
        {
            title: "โจทย์ปัญหาการลบ",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            exerciseCount: "30 ข้อ",
            status: "ยังไม่เริ่ม"
        },
        {
            title: "โจทย์ปัญหาการหาร",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            exerciseCount: "18 ข้อ",
            status: "เสร็จ"
        },
        {
            title: "โจทย์ปัญหาการแก้สมการง่ายๆ",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            exerciseCount: "12 ข้อ",
            status: "กำลังทำ"
        }
    ];
    return (
        <div className="h-[calc(100vh-65px)] min-h-fit flex flex-col justify-center items-center">
            <div className="flex rounded-b-lg w-full h-[157px] bg-primary">
                <button className=" m-5 btn btn-black btn-outline bg-white rounded-full shadow-sm">ย้อนกลับ <RiArrowGoBackFill /></button>
            </div>
            <div className="flex flex-col w-[965px] h-fit min-h-[500px]">
                <div className="flex justify-between items-end">
                    <div className="flex flex-col text-primary my-8 gap-3">
                        <header className="text-5xl font-bold text-shadow-lg">คณิตสอบแข่ง</header>
                        <header className="text-xl font-bold text-shadow-lg">Wuttipat Rojpetipongsakorn</header>
                    </div>
                    <button className="btn btn-primary rounded-full shadow-sm">ลงทะเบียน<FaPlus /></button>
                </div>

                <div className="flex flex-col bg-base-300 rounded-lg shadow-sm text-base p-5 my-5">
                    <header className="text-2xl font-bold">เกี่ยวกับคอร์ส</header>
                    <span className="px-10 py-5 w-full">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus placerat sodales. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis vel massa magna. Fusce erat mauris, feugiat in eleifend vel, lacinia et sapien. Sed gravida quis eros euismod molestie. Proin fringilla, urna quis dapibus luctus, nisl purus porta nisl, ut lacinia nisl sapien sed lorem. Aliquam bibendum, nulla ut pretium porttitor, metus nunc eleifend nunc, ac fermentum magna magna a massa. Quisque venenatis lorem vitae arcu finibus, nec commodo odio efficitur. In in sollicitudin dui, ac volutpat magna. Nulla nec luctus turpis. Nam gravida imperdiet molestie.</span>
                </div>

                <DataTable name="topic"/>
            </div>
        </div>
    )
}