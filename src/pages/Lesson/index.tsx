import { RiArrowGoBackFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";

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

                <div className="flex flex-col flex-1 w-full h-full py-5 text-neutral-content">
                    <header className="text-xl font-bold pb-5">{data.length} หัวข้อ</header>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr className="bg-base-300 text-base-content w-full">
                                    <th className="rounded-l-xl">ชื่อหัวข้อ</th>
                                    <th>description</th>
                                    <th>จำนวนแบบฝึกหัด</th>
                                    <th className="rounded-r-xl">สถานะ</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((course) =>
                                    <tr className="border-0">
                                        <td>{course.title}</td>
                                        <td>{course.description}</td>
                                        <td>{course.exerciseCount}</td>
                                        <td>{course.status}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex items-center justify-center mb-5">
                    <div className="flex join justify-center items-center gap-2 font-bold">
                        <button className="join-item w-fit h-fit hover:cursor-pointer p-3">«</button>
                        <button className="join-item text-xs bg-primary text-primary-content  rounded-lg h-7 w-7">1</button>
                        <button className="join-item text-xs hover:cursor-pointer hover:bg-primary hover:text-primary-content rounded-lg h-7 w-7">2</button>
                        <button className="join-item text-xs hover:cursor-pointer hover:bg-primary hover:text-primary-content rounded-lg h-7 w-7">3</button>
                        <button className="join-item w-fit h-fit hover:cursor-pointer p-3">»</button>
                    </div>
                </div>
            </div>
        </div>
    )
}