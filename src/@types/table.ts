export interface ColumnConfig<T> {
    key: keyof T;
    header: string;
    display?: boolean; // Whether to show in table
    sortable?: boolean;
    width?: string;
    render?: (value: any, row: T) => React.ReactNode; // Custom renderer
}

export interface TableConfig<T> {
    columns: ColumnConfig<T>[];
    rowIdKey: string;
    title: string;
    navDest: string;
}

export type IdKey = "course_id" | "topic_id"

type BasePageRequest = {
    user_id: string;
    current_page: number;
    page_size: number;
}

export type DataTableProps<K extends IdKey> = {
    name: string
    id_key: K
    data_id: number
}

export type PageReqWithId<K extends IdKey> = BasePageRequest & { [P in K]: number };

export interface SkeletonRowProp{
    loading: string;
}
export interface TopicRowProp {
    topic_id: number
    topic_name: string;
    topic_description: string | null;
    completed_questions: number;
    question_amount: string;
    topic_completed: boolean;
}

export interface ExerciseRowProp {
    title: string,
    tag_names: Array<string>,
    difficulty : string,
    question_id : number,
    is_completed : boolean
}