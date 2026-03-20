import { useState } from "react"
import DataTable from "../../Table/DataTable"
import supabaseClient from "../../../utils/SupabaseClient";
import { useUppyWithSupabase } from "../../UppyWithSupabase";
import DashboardModal from "@uppy/react/dashboard-modal";

import "../../UppyWithSupabase/uppy.css"

export default function DocumentTable({
    course_id,
    isModal,
    setModal,
    edit_permission
}: {
    course_id: string | undefined,
    isModal: boolean,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    edit_permission: boolean
}) {
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
    const deleteFile = async (file_name: string) => {
        const { data, error } = await supabaseClient.storage.from('document_course').remove([`${course_id}/${file_name}`])


        if (error) throw error
        if (data) setRefreshTrigger(refreshTrigger + 1);
    }

    const uppy = useUppyWithSupabase({ bucketName: 'document_course', course_id: course_id })
        .on('complete', (result) => {
            if (result.failed?.length === 0) {
                setRefreshTrigger((prev) => prev + 1);
            }
        });


    return (
        <div>
            <DashboardModal
                open={isModal && edit_permission}
                onRequestClose={() => setModal(false)}
                uppy={uppy}
                proudlyDisplayPoweredByUppy={false}
                disableInformer={true}
            />
            <DataTable
                name="course-doc-list"
                id_key="course_id"
                bucketName="document_course"
                data_id={Number(course_id)}
                deleteScript={deleteFile}
                extraScript={() => setModal(true)}
                refreshTrigger={refreshTrigger}
                showAction={edit_permission}
            />
        </div>
    )
}