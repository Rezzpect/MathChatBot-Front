import type { HintRowProp, TableConfig } from '../../@types/table';
import type { TopicRowProp,SkeletonRowProp, ExerciseRowProp } from '../../@types/table';

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
    columns: [
        { key: 'topic_id', header: 'ID', display: false},
        { key: 'topic_name', header: 'ชื่อหัวข้อ', display: true },
        { key: 'topic_description', header: 'description', display: true },
        { key: 'completed_questions', header: 'คำถามที่ทำแล้ว', display: false},
        { key: 'question_amount', header: 'จำนวนคำถาม', display: true },
        { key: 'topic_completed', header: 'สถานะ', display: true },
    ]
};

export const exerciseTableConfig: TableConfig<ExerciseRowProp> = {
    title: "แบบฝึกหัด",
    rowIdKey: "question_id",
    navDest: "/exercise/",
    columns: [
        { key: 'title', header: 'ID', display: true, width: '80px' },
        { key: 'tag_names', header: 'ชื่อแบบฝึกหัด', display: true },
        { key: 'difficulty', header: 'คะแนน', display: true, width: '100px' },
        { key: 'question_id', header: 'สถานะ', display: true, },
        { key: 'is_completed', header: 'Description', display: false },
    ]
};

export const hintTableConfig: TableConfig<HintRowProp> = {
    title: "Hint",
    rowIdKey: "้hint_id",
    navDest: "",
    editOption: true,
    deleteOption: true,
    columns: [
        { key: 'example_question', header: 'ตัวอย่างคำถาม', display: true, width: '100px' },
        { key: 'hint', header: 'คำใบ้', display: true },
    ]
};