import { useState } from "react"
import DataTable from "../../Table/DataTable"
import supabaseClient from "../../../utils/SupabaseClient";
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
    const [modalOption, setModalOption] = useState<string>('edit');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isDeleteModal,setIsDeleteModal] = useState<boolean>(false);
    const [topicId,setTopicId] = useState<string>('');

    const onOpenModal = (topicData: TopicRowProp) => {
        setModalOption('edit');
        setModalData(topicData);
        setIsModalOpen(true);
    };

    const openCreateModal = () => {
        setModalOption('create');
        setIsModalOpen(true);
    }

    const deleteTopic = async (topic_id: string) => {
        const result = await supabaseClient.functions.invoke('delete-topic', {
            method: 'DELETE',
            body: {
                "topic_id": topic_id
            }
        })
        console.log(result);
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
                    idName="topic_id"
                    id={topicId}
                    funcName="delete-topic"
                    message="หากดำเนินการต่อ หัวข้อที่ถูกลบและคำถามที่อยู่ข้างในจะไม่สามารถถูกกู้คืนได้"
                    setOpen={setIsDeleteModal}
                    setRefresh={setRefreshTrigger}
                />
            }
            {edit_permission && isModalOpen &&
                <TopicModal
                    modalData={modalData}
                    setOpen={setIsModalOpen}
                    options={modalOption}
                    refreshSubmit={setRefreshTrigger}
                />}

            <DataTable
                name="topic-list-in-course"
                id_key="course_id"
                data_id={Number(course_id)}
                editScript={onOpenModal}
                deleteScript={handleDelete}
                extraScript={openCreateModal}
                refreshTrigger={refreshTrigger}
                showAction={edit_permission}
            />
        </div>
    )
}