export type Roles = 'teacher' | 'student' | 'admin';
export interface ColumnConfig<T> {
    key: keyof T; // Key of the data to display (From IdKey)
    header: string; // Column header name
    display?: boolean; // Whether to show in table
    width?: string; // CSS width value for the column
    displayRole?: Roles[]; // Roles that can see this column, if undefined, all roles can see
}

export interface TableConfig<T> {
    columns: ColumnConfig<T>[]; // Configuration for each column in the table
    rowIdKey: string; // Key in the data that uniquely identifies a row (e.g., "id")
    title: string; // Title of the table
    navDest?: string; // Optional base path for navigation when a row is clicked
    isFile?: boolean; // Whether the table is displaying files, which may require special handling
}

export type IdKey = "course_id" | "topic_id" | "question_id" | "user_id"

type BasePageRequest = {
    current_page: number;
    page_size: number;
}

export type DataTableProps<K extends IdKey> = {
    name: string,
    id_key?: K,
    data_id?: number | string,
    editScript?: (item: any) => void,
    deleteScript?: (item: any) => void,
    extraScript?: (item: any) => void,
    bucketName?: string,
    showAction?: boolean,
    refreshTrigger?: number,
    underline?: boolean,
    enableNav?: boolean,
}

export type hintTableProps = {
    data_id: number | string,
    editScript?: (item: any) => void,
    deleteScript?: (item: any) => void,
    extraScript?: (item: any) => void,
    refreshTrigger?: number,
    showAction?: boolean,
    underline?: boolean,
}

export type PageReqWithId<K extends IdKey> = BasePageRequest & { [P in K]: number };

export interface SkeletonRowProp {
    loading: string;
}
export interface TopicRowProp {
    topic_id: number
    topic_name: string;
    topic_description: string | null;
    question_amount: string;
}

export interface QuestionRowProp {
    title: string,
    tag_names: string[],
    difficulty: string,
    question_id: number,
    optional: object,
    is_published: boolean
}

export interface HintRowProp {
    hint_content: string,
    hint_id: number,
    hint_title: string,
}

export interface CourseRowProp {
    course_id: number,
    difficulty: string,
    course_name: string,
    course_owner: string,
    student_amount: number,
    is_published: boolean,
    course_description: string | undefined
}

export interface EnrolledRowProp extends CourseRowProp {
    is_completed: boolean
}

export interface FileRowProp {
    name: string,
}

export interface StudentRowProp {
    user_id: string,
    is_completed: boolean,
    public_email: string,
    student_name: string,
    profile_picture: string
}

