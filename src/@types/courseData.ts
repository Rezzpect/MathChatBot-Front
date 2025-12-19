export interface CourseData {
    course_id: number,
    course_name: string,
    course_owner_id: string,
    course_owner: string,
    difficulty: string,
    course_description: string | null,
    student_amount: number,
    created_date: string,
    updated_date: string
}