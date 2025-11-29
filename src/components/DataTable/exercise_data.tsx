export const exercise_data = {
    header: ["ชื่อแบบฝึกหัด", "ระดับ", "สถานะ"],
    data: [
        {
            exerciseName: "แบบฝึกหัดบวกเลขพื้นฐาน",
            level: "ง่าย",
            status: "ยังไม่เสร็จ"
        },
        {
            exerciseName: "โจทย์ลบเลขมีทด",
            level: "ปานกลาง",
            status: "เสร็จ"
        },
        {
            exerciseName: "โจทย์คูณเลขสองหลัก",
            level: "ยาก",
            status: "ยังไม่เสร็จ"
        },
        {
            exerciseName: "แบบฝึกแบ่งเศษส่วน",
            level: "ปานกลาง",
            status: "เสร็จ"
        },
        {
            exerciseName: "ปัญหาเลขประยุกต์เบื้องต้น",
            level: "ยาก",
            status: "ยังไม่เสร็จ"
        }
    ],
}

export interface exercise_row {
    exerciseName: string,
    level: string,
    status: string
}
