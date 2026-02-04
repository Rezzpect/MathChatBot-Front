
interface ModalProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditTopicModal(
    { setOpen }: ModalProps
) {
    return (
        <div className="fixed w-full h-full bg-black/50 top-0  flex justify-center items-center z-100">
            <div className="h-fit bg-base-100 shadow-sm rounded-lg w-120">
                <div className="flex flex-col gap-10 p-5 pt-10 text-neutral-content">
                    <form>
                        <div className="flex flex-col gap-2 w-full">
                            <label className="font-bold" htmlFor="course-title">ชื่อหัวข้อ</label>
                            <input className="w-full border border-neutral p-2 rounded-sm focus:border-primary focus:outline-none" type="text" id="course-title" />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label className="font-bold" htmlFor="description">Description</label>
                            <input className="w-full h-[20vh] border border-neutral p-2 rounded-sm focus:border-primary focus:outline-none" type="text" id="description" />
                        </div>
                    </form>
                    <div className="flex w-full justify-end gap-2">
                        <button
                            onClick={() => setOpen(false)}
                            className="hover:cursor-pointer rounded-full bg-white border border-black text-black font-bold text-lg py-2 px-5">Cancel</button>

                        <button
                            onClick={() => setOpen(false)}
                            className="hover:cursor-pointer rounded-full bg-primary text-primary-content font-bold text-lg py-2 px-5">Save</button>
                    </div>
                </div>


            </div>
        </div>
    )
}