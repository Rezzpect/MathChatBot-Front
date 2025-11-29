export const topic_data = {
    header: ["ชื่อหัวข้อ", "description", "จำนวนแบบฝึกหัด", "สถานะ"],
    data: [
        {
            title: "โจทย์ปัญหาการคูณ",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            exerciseCount: "23 ข้อ",
            status: "เสร็จ"
        },
        {
            title: "โจทย์ปัญหาการบวก",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            exerciseCount: "15 ข้อ",
            status: "กำลังทำ"
        },
        {
            title: "โจทย์ปัญหาการลบ",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            exerciseCount: "30 ข้อ",
            status: "ยังไม่เริ่ม"
        },
        {
            title: "โจทย์ปัญหาการหาร",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            exerciseCount: "18 ข้อ",
            status: "เสร็จ"
        },
        {
            title: "โจทย์ปัญหาการแก้สมการง่ายๆ",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            exerciseCount: "12 ข้อ",
            status: "กำลังทำ"
        }
    ],
}

export interface topic_row {
    title: string;
    description: string;
    exerciseCount: string;
    status: string;
}