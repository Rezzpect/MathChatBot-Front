export interface PlanData {
    "course_id": number,
    "course_name": string,
    "topic_id": number,
    "topic_name": string,
    "start_day": number,
    "day_todo": number,
    "created_date": Date,
    "updated_date": Date
}

export interface PlanForm {
    "course_id": number,
    "topic_id": number,
    "start_day": number,
    "day_todo": number,
}

export interface PlanValidate {
    "course_id": string,
    "topic_id": string,
    "start_day": string,
    "day_todo": string,
}