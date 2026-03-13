export interface CourseData {
    course_id: number,
    course_name: string,
    course_owner_id: string,
    course_owner: string,
    difficulty: string,
    course_description: string | null,
    edit_permission: boolean,
    student_amount: number,
    is_published: boolean,
    created_date: string,
    updated_date: string,
    banner_picture: string | null;
}

export type CourseForm = {
    course_name: string,
    difficulty: string,
    course_description: string,
    is_published: boolean,
    course_id: string,
}

export type CourseFormValidate = {
    course_name: string,
    course_description: string,
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

export interface CourseProgress {
    course_id: number;
    course_name: string;
    is_completed: boolean;
    completion_percentage: number;
    last_active_date: Date | string | null;
}

export interface ProgressProp {
    course_name: string,
    progress: number
}