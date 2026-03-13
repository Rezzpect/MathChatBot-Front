import { useState } from "react"
import DataTable from "../../Table/DataTable"
import supabaseClient from "../../../utils/SupabaseClient";

export default function StudentListTable({
    course_id,
}: {
    course_id: string | undefined,
}) {

    return (
        <div>
            <DataTable
                name="student-list-in-course"
                id_key="course_id"
                data_id={Number(course_id)}
            />
        </div>
    )
}