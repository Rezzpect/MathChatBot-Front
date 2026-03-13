export type TopicForm = {
    topic_name: string,
    topic_description: string
    topic_id?: string
    course_id?: string
}

export type TopicData = {
    course_id: number,
    course_name: string,
    course_owner: string,
    course_owner_id: string,
    created_date: string,
    edit_permission: boolean,
    topic_description: string,
    topic_id:number,
    topic_name: string,
    updated_date: string,
}
