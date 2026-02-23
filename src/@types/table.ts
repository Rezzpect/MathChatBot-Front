export interface ColumnConfig<T> {
    key: keyof T;
    header: string;
    display?: boolean; // Whether to show in table
    sortable?: boolean;
    islist?: boolean;
    width?: string;
    render?: (value: any, row: T) => React.ReactNode; // Custom renderer
}

export interface TableConfig<T> {
    columns: ColumnConfig<T>[];
    rowIdKey: string;
    title: string;
    navDest: string;
    editOption?: boolean;
    deleteOption?: boolean;
    extraOption?: boolean;
}

export type IdKey = "course_id" | "topic_id" | "question_id" | "user_id"

type BasePageRequest = {
    current_page: number;
    page_size: number;
}

export type DataTableProps<K extends IdKey> = {
    name: string,
    id_key: K,
    data_id: number | string,
    editScript?: (item:any)=>void,
    deleteScript?: (item:any)=>void,
    extraScript?: (item:any)=>void,
    refreshTrigger?:number,
    underline?: boolean
}

export type PageReqWithId<K extends IdKey> = BasePageRequest & { [P in K]: number };

export interface SkeletonRowProp{
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
    difficulty : string,
    question_id : number,
    is_completed : boolean
}

export interface HintRowProp {
    hint_content:string,
    hint_id : number,
}

export interface CourseRowProp {
    course_id: number,
    difficulty: string,
    course_name: string,
    course_owner: string,
    student_amount: number,
    course_description:string | undefined
}

