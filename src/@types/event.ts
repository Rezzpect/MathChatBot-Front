export type EventItems = {
    start:Date,
    end:Date,
    title:string,
    course_id:number,
    progress_count:number,
    question_todo:number, //progress_count/question_todo
    plan_id:number,
    is_completed:boolean, //เสร็จหรือยัง(เป็น Optional) กูไม่รู้มันเช็คได้ไหม
}

export type EventResProp = {
    start_date:Date,
    end_date:Date,
    course_name:string,
    course_id:number,
    progress_count:number,
    question_todo:number, //progress_count/question_todo
    plan_id:number,
    is_completed:boolean, //เสร็จหรือยัง(เป็น Optional) กูไม่รู้มันเช็คได้ไหม
}