import DataTable from "../../components/Table/DataTable";
import { useMemo, useState } from "react";
import supabaseClient from "../../utils/SupabaseClient";
import type { HintRowProp } from "../../@types/table";
import { useParams } from "react-router-dom";
import HintModal from "../../modals/HintModal";
import toast from "react-hot-toast";
import HintTable from "../../components/Table/HintTable";
import DeleteModal from "../../modals/DeleteModal";

export default function HintMenu() {
    const { questionId } = useParams();
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [isCreateOpen,setIsCreateOpen] = useState<boolean>(false);
    const [modalData, setModalData] = useState<HintRowProp | undefined>(undefined);
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
    const [hintId,setHintId] = useState<string>('');
    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
    const isEdit = useMemo(() => { return Boolean(questionId) }, [])

    const onEditModal = (hintData: HintRowProp) => {
        setModalData(hintData)
        setIsEditOpen(true);
    };

    const openCreateModal = () => {
        setIsCreateOpen(true);
    }

    const handleDelete = async (hint_id: string) => {
        setHintId(hint_id);
        setIsDeleteModal(true);
    }

    return (
        <div className='py-5 min-h-[400px]'>
            {
                isDeleteModal &&
                <DeleteModal
                    idName="hint_id"
                    id={hintId}
                    funcName="delete-hint"
                    message="หากดำเนินการต่อ ตัวอย่างคำใบ้ที่ถูกลบจะไม่สามารถกู้คืนกลับมาได้"
                    setOpen={setIsDeleteModal}
                    setRefresh={setRefreshTrigger}
                />
            }
            {isEdit && isEditOpen && <HintModal
                modalData={modalData}
                setOpen={setIsEditOpen}
                options={'edit'}
                refreshSubmit={setRefreshTrigger} />
            }
            {isEdit && isCreateOpen && <HintModal
                setOpen={setIsCreateOpen}
                options={'create'}
                refreshSubmit={setRefreshTrigger} />
            }
            <HintTable
                data_id={Number(questionId)}
                underline={true}
                editScript={onEditModal}
                deleteScript={handleDelete}
                extraScript={openCreateModal}
                refreshTrigger={refreshTrigger}
                showAction={true}
            />
        </div>
    )
}