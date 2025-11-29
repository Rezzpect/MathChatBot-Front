import { RiArrowGoBackFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import DataTable from "../../components/DataTable/datatable";

export default function ProblemSelectionPage() {
    const exercise_title = "โจทย์ปัญหาบวก ลบ คูณ หาร"
    const exercise_count = [
        1,2,3,4,5,6,7,8,9,10,
        11,12,13,14,15,16,17,18,19,20
    ]
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

                        <DataTable name="exercise"/>
                    </div>
                </div>
    )
}