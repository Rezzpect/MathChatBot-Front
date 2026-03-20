export type EventItems = {
    start:Date,
    end:Date,
    title:string,
    course_id:number,
    topic_id:number,
    topic_name:string,
    progress: {total:number,completed:number}
}

export type EventResProp = {
    start_date:Date, 
    end_date:Date, 
    course_name:string, 
    course_id:number, 
    topic_id:number, 
    topic_name: string, 
    progress: {total:number,completed:number}
}