import { useState } from "react"
import DataTable from "../../Table/DataTable"
import type { TopicRowProp } from "../../../@types/table";
import TopicModal from "../../../modals/TopicModal";
import DeleteModal from "../../../modals/DeleteModal";

export default function TopicTable({
    course_id,
    edit_permission
}: {
    course_id: string | undefined,
    edit_permission: boolean
}) {
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
    const [modalData, setModalData] = useState<TopicRowProp | undefined>(undefined);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [isCreateOpen,setIsCreateOpen] = useState<boolean>(false);
    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
    const [topicId, setTopicId] = useState<string>('');

    const openEditModal = (topicData: TopicRowProp) => {
        setModalData(topicData);
        setIsEditOpen(true);
    };

    const openCreateModal = () => {
        setIsCreateOpen(true);
    }

    const handleDelete = async (topic_id: string) => {
        setTopicId(topic_id);
        setIsDeleteModal(true);
    }

    return (
        <div>
            {
                isDeleteModal &&
                <DeleteModal
                    body={{topic_id:topicId}}
                    funcName="delete-topic"
                    message="หากดำเนินการต่อ หัวข้อที่ถูกลบและคำถามที่อยู่ข้างในจะไม่สามารถถูกกู้คืนได้"
                    setOpen={setIsDeleteModal}
                    setRefresh={setRefreshTrigger}
                />
            }
            {edit_permission && isEditOpen &&
                <TopicModal
                    modalData={modalData}
                    setOpen={setIsEditOpen}
                    options={'edit'}
                    refreshSubmit={setRefreshTrigger}
                />}
            
            {edit_permission && isCreateOpen &&
                <TopicModal
                    setOpen={setIsCreateOpen}
                    options={'create'}
                    refreshSubmit={setRefreshTrigger}
                />}

            <DataTable
                name="topic-list-in-course"
                id_key="course_id"
                data_id={Number(course_id)}
                editScript={openEditModal}
                deleteScript={handleDelete}
                extraScript={openCreateModal}
                refreshTrigger={refreshTrigger}
                showAction={edit_permission}
            />
        </div>
    )
}