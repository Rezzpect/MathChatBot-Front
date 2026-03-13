import { useNavigate } from "react-router-dom"
import type { ModalProps } from "../../@types/modal";
import { BsXCircleFill } from "react-icons/bs";

export default function WrongModal(
    { setOpen }: ModalProps
) {
    const navigate = useNavigate();

    return (
        <div className="fixed w-full h-full bg-black/50 top-0  flex justify-center items-center z-100">
            <div className="h-fit bg-base-100 shadow-sm rounded-lg w-120">
                <div className="flex flex-col gap-5 p-10 items-center text-neutral-content">
                    <BsXCircleFill className="text-secondary w-25 h-25" />
                    <header className="text-3xl">WRONG</header>
                    <p>เสียใจด้วยเป็นคำตอบที่ผิด</p>
                    <span className="divider divider-secondary"></span>
                    <div className="flex w-full justify-center gap-2">
                        <button
                            onClick={() => setOpen(false)}
                            className="hover:cursor-pointer rounded-full bg-white border border-black text-black font-bold text-lg py-2 px-5">
                            ลองใหม่
                        </button>
                    </div>
                </div>


            </div>
        </div>
    )
}