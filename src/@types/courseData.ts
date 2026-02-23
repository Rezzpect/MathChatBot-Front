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

export type CourseForm = {
    course_name: string,
    difficulty: string,
    course_description: string,
    is_published: boolean,
    course_id:string
}

export type CourseModalData = {
    course_name: string,
    difficulty: string,
    course_description: string | null,
    course_id?: number,
    course_owner: string,
    student_amount: number,
    is_published?: boolean
}