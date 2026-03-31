import { useEffect, useState } from "react";

import "./timepicker.css";
import type { EventModalProps } from "../../@types/modal";
import { format } from "date-fns";

export default function EventModal({
    modalData,
    setOpen,
}: EventModalProps
) {
    const [disableEdit] = useState<boolean>(modalData ? true : false);

    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        return () => {
            document.body.classList.remove('overflow-hidden');
        }
    }, [])

    return (
        <div className="fixed w-full h-full bg-black/50 top-0 left-0 flex justify-center items-center z-9999">
            <div className="h-fit w-140 bg-base-100 shadow-sm rounded-lg">
                <div className="flex flex-col gap-5 p-5 pt-10 text-neutral-content">
                    <div className="flex flex-col w-full h-fit">
                        <header className="text-xl font-bold">{modalData.title}</header>
                        <header className="text-lg">{modalData.topic_name}</header>
                    </div>

                    <div className="flex md:flex-row flex-col gap-2 w-full">
                        <div className="flex flex-col w-full">
                            <label htmlFor="start-time">Start Time</label>
                            <input className='border border-neutral outline-none focus:border-primary rounded-lg p-2 w-full h-fit'
                                disabled={disableEdit}
                                value={format(modalData.start, "yyyy-MM-dd'T'HH:mm")}
                                id="start-time"
                                type="datetime-local"
                            />
                        </div>

                        <div className="flex flex-col w-full ">
                            <label htmlFor="end-time">End Time</label>
                            <input className={'border outline-none h-fit rounded-lg p-2 w-full border-neutral'}
                                disabled={disableEdit}
                                value={format(modalData.end, "yyyy-MM-dd'T'HH:mm")}
                                id="end-time"
                                type="datetime-local"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col rounded-lg bg-neutral gap-5 p-5">
                        <div className="flex justify-between">
                            <div className="flex flex-col gap-2">
                                <div className="text-5xl font-bold">
                                    {modalData.progress.completed} / {modalData.progress.total}
                                </div>
                                <span className="text-sm">คำถามที่ทำเสร็จแล้ว</span>
                            </div>
                        </div>
                        <progress className="progress progress-primary w-full" value={modalData.progress.completed} max={modalData.progress.total}></progress>
                    </div>



                        <div className="w-full flex justify-end">
                            <button
                                        onClick={() => { setOpen(false) }}
                                        className="hover:cursor-pointer rounded-full bg-white border border-black text-black font-bold text-lg py-2 px-5">Close
                            </button>
                        </div>            
                </div>


            </div>
        </div>
    )
}