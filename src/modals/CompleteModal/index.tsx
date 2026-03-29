import { useNavigate } from "react-router-dom"
import type { QuestionCompleteModalProps } from "../../@types/modal";
import { BsCheckCircleFill } from "react-icons/bs";

export default function CompleteModal({
    setOpen,
    topicId }: QuestionCompleteModalProps
) {
    const navigate = useNavigate();

    return (
        <div className="fixed w-full h-full bg-black/50 top-0  flex justify-center items-center z-100">
            <div className="h-fit bg-base-100 shadow-sm rounded-lg w-120">
                <div className="flex flex-col gap-5 p-10 items-center text-neutral-content">
                    <BsCheckCircleFill className="text-primary w-25 h-25" />
                    <header className="text-3xl">SUCCESS</header>
                    <p>ยินดีด้วยคุณตอบได้ถูกต้อง!</p>
                    <span className="divider divider-primary"></span>
                    <div className="flex w-full justify-center gap-2">
                        <button
                            onClick={() => setOpen(false)}
                            className="hover:cursor-pointer rounded-full bg-white border border-black text-black font-bold text-lg py-2 px-5">อยู่ต่อ</button>

                        <button
                            className="hover:cursor-pointer rounded-full bg-primary text-primary-content font-bold text-lg py-2 px-5"
                            onClick={() => (navigate(`/topic/${topicId}`))}
                        >เลือกแบบฝึกหัดใหม่</button>
                    </div>
                </div>


            </div>
        </div>
    )
}