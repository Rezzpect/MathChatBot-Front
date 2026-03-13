import { useState } from "react"
import DataTable from "../../Table/DataTable"
import type { QuestionRowProp } from "../../../@types/table";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../modals/DeleteModal";

export default function QuestionTable({
    topic_id,
    edit_permission
}: {
    topic_id: string | undefined,
    edit_permission: boolean
}) {
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
    const [questionId, setQuestionId] = useState<string>('0')

    const navigate = useNavigate();

    const handleDeleteWarning = async (question_id: string) => {
        setQuestionId(question_id)
        setIsDeleteModal(true);
    }

    return (
        <div>
            {
                isDeleteModal &&
                <DeleteModal
                    idName="question_id"
                    id={questionId}
                    funcName="delete-question"
                    message="หากดำเนินการต่อคำถามที่ถูกลบและตัวอย่างการใบ้ที่อยู่ข้างในจะไม้สามารถถูกกู้คืนกลับมาได้"
                    setOpen={setIsDeleteModal}
                    setRefresh={setRefreshTrigger}
                />
            }
            <DataTable
                name="question-list-in-topic"
                id_key="topic_id"
                data_id={Number(topic_id)}
                editScript={(rowData: QuestionRowProp) => navigate(`editquestion/${rowData.question_id}`)}
                deleteScript={handleDeleteWarning}
                extraScript={() => navigate('editquestion')}
                refreshTrigger={refreshTrigger}
                showAction={edit_permission}
            />
        </div>
    )
}