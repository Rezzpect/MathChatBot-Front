import { MdEdit } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { DayPicker } from "react-day-picker";
import { useState } from "react";

import "./timepicker.css";

interface ModalProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EventModal(
    { setOpen }: ModalProps
) {
    const [startDate, setStartDate] = useState<Date>()
    return (
        <div className="fixed w-full h-full bg-black/50 top-0  flex justify-center items-center z-100">
            <div className="h-fit bg-base-100 shadow-sm rounded-lg w-120">
                <div className="flex flex-col gap-5 p-5 pt-10 text-neutral-content">
                    <div className="flex gap-2 items-end">
                        <div className="flex flex-col dropdown dropdown-bottom w-[80%] h-fit">
                            <label htmlFor="course-select">คอร์สที่จะทำ</label>
                            <div id="course-select" tabIndex={0} role="button" className="btn w-full border border-black bg-base-100">Click ⬇️</div>
                            <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-full p-2 shadow-sm">
                                <li><a>Item 1</a></li>
                                <li><a>Item 2</a></li>
                            </ul>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="exercise-todo">จำนวนข้อที่จะทำ</label>
                            <input className='border h-full w-[10vw] p-2 rounded-lg' min={0} id="exercise-todo" type='number' />
                        </div>
                    </div>


                    <div className="flex gap-5 items-end">
                        <div>
                            <button popoverTarget="sdp-popover" className="bg-primary text-primary-content hover:cursor-pointer p-2 rounded-lg w-[7vw] h-fit" style={{ anchorName: "--sdp" } as React.CSSProperties}>
                                {startDate ? startDate.toLocaleDateString() : "--/--/----"}
                            </button>
                            <div popover="auto" id="sdp-popover" className="dropdown shadow-sm" style={{ positionAnchor: "--sdp" } as React.CSSProperties}>
                                <DayPicker required className="react-day-picker" mode="single" selected={startDate} onSelect={setStartDate} />
                            </div>
                        </div>

                        <form className="flex gap-2">
                            <div className="flex flex-col">
                                <label htmlFor="start-time">Start Time</label>
                                <input className='border h-full rounded-lg p-2 w-[10vw] h-fit' id="start-time" type="time" />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="end-time">End Time</label>
                                <input className='border h-fit rounded-lg p-2 w-[10vw] ' id="end-time" type="time" />
                            </div>
                        </form>
                    </div>

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