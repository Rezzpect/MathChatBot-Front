import type { CourseRowProp, EnrolledRowProp, FileRowProp, HintRowProp, StudentRowProp, TableConfig } from '../../../@types/table';
import type { TopicRowProp, SkeletonRowProp, QuestionRowProp } from '../../../@types/table';

export const skeltonTableConfig: TableConfig<SkeletonRowProp> = {
    title: "Loading",
    rowIdKey: "",
    columns: [
        { key: 'loading', header: 'กำลังโหลด', display: true },
    ]
};

export const topicTableConfig: TableConfig<TopicRowProp> = {
    title: "โจทย์ปัญหา",
    rowIdKey: "topic_id",
    navDest: "/topic/",
    columns: [
        { key: 'topic_id', header: 'ID', display: false },
        { key: 'topic_name', header: 'ชื่อหัวข้อ', display: true },
        { key: 'topic_description', header: 'Description', display: true },
        { key: 'question_amount', header: 'จำนวนคำถาม', display: true },
    ]
};

export const questionTableConfig: TableConfig<QuestionRowProp> = {
    title: "แบบฝึกหัด",
    rowIdKey: "question_id",
    navDest: "/question/",
    columns: [
        { key: 'title', header: 'ชื่อแบบฝึกหัด', display: true, width: '200px' },
        { key: 'tag_names', header: 'Tags', display: true },
        { key: 'difficulty', header: 'ความยาก', display: true, width: '100px' },
        { key: 'question_id', header: 'ID', display: false, },
        { key: 'is_completed', header: 'Description', display: false },
    ]
};

export const hintTableConfig: TableConfig<HintRowProp> = {
    title: "Hint",
    rowIdKey: "hint_id",
    columns: [
        { key: 'hint_id', header: 'Hint id', display: false, width: '100px' },
        { key: 'hint_title', header: 'คำถาม', display: true,width:'15rem' },
        { key: 'hint_content', header: 'คำใบ้', display: true },
        
    ]
};

export const teacherCourseTableConfig: TableConfig<CourseRowProp> = {
    title: "คอร์สของฉัน",
    rowIdKey: "course_id",
    navDest: "/course/",
    columns: [
        { key: 'course_id', header: 'Course id', display: false, width: '100px' },
        { key: 'course_name', header: 'คอร์ส', display: true },
        { key: 'course_description', header: 'description', display: true },
        { key: 'course_owner', header: 'เจ้าของ', display: false },
        { key: 'difficulty', header: 'ความยาก', display: false },
        { key: 'student_amount', header: 'จำนวนนักเรียน', display: true },

    ]
};

export const studentCourseTableConfig: TableConfig<EnrolledRowProp> = {
    title: "คอร์สของฉัน",
    rowIdKey: "course_id",
    navDest: "/course/",
    columns: [
        { key: 'course_id', header: 'Course id', display: false, width: '100px' },
        { key: 'course_name', header: 'คอร์ส', display: true },
        { key: 'course_description', header: 'description', display: false },
        { key: 'course_owner', header: 'เจ้าของ', display: false },
        { key: 'difficulty', header: 'ความยาก', display: true },
        { key: 'student_amount', header: 'จำนวนนักเรียน', display: true },
        { key: 'is_completed', header: 'สถานะ', display: true }
    ]
};

export const DocumentTableConfig: TableConfig<FileRowProp> = {
    title: "File",
    rowIdKey: "id",
    isFile: true,
    columns: [
        { key: 'name', header: 'File', display: true }
    ]
};

export const StudentInCourseTableConfig: TableConfig<StudentRowProp> = {
    title: "รายชื่อนักเรียน",
    rowIdKey: "student_id",
    columns: [
        { key: 'user_id', header: '', display: false },
        { key: 'student_name', header: 'ชื่อ-นามสกุล', display: true },
        { key: 'public_email', header: 'email', display: true },
        { key: 'is_completed', header: 'เล่นเสร็จหรือยัง', display: true },
        { key: 'profile_picture', header: 'รูปโปลไฟล์', display: false }
    ]
}
