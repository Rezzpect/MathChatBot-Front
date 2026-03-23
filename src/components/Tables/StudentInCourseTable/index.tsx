import DataTable from "../../Table/DataTable"

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