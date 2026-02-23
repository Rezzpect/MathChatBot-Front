import type { CourseRowProp, HintRowProp, TableConfig } from '../../@types/table';
import type { TopicRowProp, SkeletonRowProp, QuestionRowProp } from '../../@types/table';

export const skeltonTableConfig: TableConfig<SkeletonRowProp> = {
    title: "Loading",
    rowIdKey: "",
    navDest: "",
    columns: [
        { key: 'loading', header: 'กำลังโหลด', display: true },
    ]
};

export const topicTableConfig: TableConfig<TopicRowProp> = {
    title: "โจทย์ปัญหา",
    rowIdKey: "topic_id",
    navDest: "/problemselection/",
    editOption: true,
    deleteOption: true,
    extraOption: true,
    columns: [
        { key: 'topic_id', header: 'ID', display: false },
        { key: 'topic_name', header: 'ชื่อหัวข้อ', display: true },
        { key: 'topic_description', header: 'description', display: true },
        { key: 'question_amount', header: 'จำนวนคำถาม', display: true },
    ]
};

export const questionTableConfig: TableConfig<QuestionRowProp> = {
    title: "แบบฝึกหัด",
    rowIdKey: "question_id",
    navDest: "question/",
    editOption: true,
    deleteOption: true,
    extraOption: true,
    columns: [
        { key: 'title', header: 'ชื่อแบบฝึกหัด', display: true, width: '80px' },
        { key: 'tag_names', header: 'Tags', display: true },
        { key: 'difficulty', header: 'ความยาก', display: true, width: '100px' },
        { key: 'question_id', header: 'ID', display: false, },
        { key: 'is_completed', header: 'Description', display: false },
    ]
};

export const hintTableConfig: TableConfig<HintRowProp> = {
    title: "Hint",
    rowIdKey: "hint_id",
    navDest: "",
    editOption: true,
    deleteOption: true,
    extraOption: true,
    columns: [
        { key: 'hint_id', header: 'Hint id', display: true, width: '100px' },
        { key: 'hint_content', header: 'คำใบ้', display: true },
    ]
};

export const teacherCourseTableConfig: TableConfig<CourseRowProp> = {
    title: "คอร์สของฉัน",
    rowIdKey: "course_id",
    navDest: "/lesson/",
    editOption: true,
    deleteOption: true,
    extraOption: true,
    columns: [
        { key: 'course_id', header: 'Course id', display: false, width: '100px' },
        { key: 'course_name', header: 'คอร์ส', display: true },
        { key: 'course_description', header: 'description', display: true },
        { key: 'course_owner', header: 'เจ้าของ', display: false },
        { key: 'difficulty', header: 'ความยาก', display: false },
        { key: 'student_amount', header: 'จำนวนนักเรียน', display: true },
        
    ]
};
