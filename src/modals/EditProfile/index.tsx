import { MdEdit } from "react-icons/md";

interface ModalProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditProfileModal(
    { setOpen }: ModalProps
) {
    return (
        <div className="fixed w-full h-full bg-black/50 top-0  flex justify-center items-center z-100">
            <div className="h-fit bg-base-100 shadow-sm rounded-lg w-120">
                {/* Banner Image */}
                <div className="relative flex justify-center rounded-t-lg w-full h-[130px] mb-5 bg-primary">
                    {/* Profile Image */}
                    <div className="flex justify-center avatar absolute w-[100px] bottom-[-30px]">
                        <div className="rounded-full">
                            <img src="https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp" />
                        </div>
                        <button className="absolute bottom-0 right-0 p-1 shadow-sm hover:cursor-pointer text-lg bg-primary text-primary-content rounded-full"><MdEdit/></button>
                    </div>
                </div>

                {/* Name and Description */}
                <div className="flex flex-col gap-10 p-5 pt-10 text-neutral-content">
                    <form>
                        <div className="flex gap-5 w-full">
                            <div className="flex flex-col gap-2 w-[50%]">
                                <label className="font-bold" htmlFor="first-name">First Name</label>
                                <input className="w-full border border-neutral p-2 rounded-sm focus:border-primary focus:outline-none" type="text" id="first-name" />
                            </div>

                            <div className="flex flex-col gap-2 w-[50%]">
                                <label className="font-bold" htmlFor="last-name">Last Name</label>
                                <input className="w-full border border-neutral p-2 rounded-sm focus:border-primary focus:outline-none" type="text" id="last-name" />
                            </div>

                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label className="font-bold" htmlFor="description">Description</label>
                            <input className="w-full border border-neutral p-2 rounded-sm focus:border-primary focus:outline-none" type="text" id="description" />
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