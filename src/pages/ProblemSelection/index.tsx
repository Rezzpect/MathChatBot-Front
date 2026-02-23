import { RiArrowGoBackFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import DataTable from "../../components/DataTable";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabaseClient from "../../utils/SupabaseClient";
import type { QuestionRowProp } from "../../@types/table";

export default function ProblemSelectionPage() {
    const params = useParams()
    const navigate = useNavigate()
    const [refreshTrigger,setRefreshTrigger] = useState<number>(0);

    const deleteQuestion = async (question_id:string) => {
        const {error} = await supabaseClient.functions.invoke('delete-question',{
            method:'DELETE',
            body : {
                question_id: question_id
            }
        })

        if (error) throw error
        else setRefreshTrigger(refreshTrigger+1);
    }

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

                <DataTable
                    name="question-list-in-topic"
                    id_key="topic_id"
                    data_id={Number(params.topicId)}
                    editScript={(rowData:QuestionRowProp)=>navigate(`editquestion/${rowData.question_id}`)}
                    deleteScript={deleteQuestion}
                    extraScript={()=>navigate('editquestion')}
                    refreshTrigger={refreshTrigger}
                />
            </div>
        </div>
    )
}