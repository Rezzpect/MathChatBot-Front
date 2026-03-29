import { useEffect, useState } from "react"
import DashboardModal from "@uppy/react/dashboard-modal";
import supabaseClient from "../../utils/SupabaseClient";
import DataTable from "../../components/Table/DataTable";
import "../../components/UppyWithSupabase/uppy.css"
import { useUppyWithSupabase } from "../../components/UppyWithSupabase";


export default function TheoryDocPage() {
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
    const [isModal, setIsModal] = useState<boolean>(false);
    const deleteFile = async (file_name: string) => {
        const { data, error } = await supabaseClient.storage.from('document_theory').remove([`private/${file_name}`])


        if (error) throw error
        if (data) setRefreshTrigger(refreshTrigger + 1);
    }

    const uppy = useUppyWithSupabase({ bucketName: 'document_theory', course_id: undefined })
        .on('complete', (result) => {
            if (result.failed?.length === 0) {
                setRefreshTrigger((prev) => prev + 1);
            }
        });

    return (
        <div className="flex justify-center items-center w-full h-full mt-10">
            <DashboardModal
                open={isModal}
                onRequestClose={() => setIsModal(false)}
                uppy={uppy}
                proudlyDisplayPoweredByUppy={false}
                disableInformer={true}
            />
            <div className="bg-base-100 shadow-sm rounded-lg p-5 w-200">
                <DataTable
                    name="theory-doc-list"
                    bucketName="document_theory"
                    deleteScript={deleteFile}
                    extraScript={() => setIsModal(true)}
                    refreshTrigger={refreshTrigger}
                    showAction={true}
                />
            </div>

        </div>
    )
}