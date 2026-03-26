import type { EventItems } from "../../@types/event"

type EventBoxProp = {
    event: EventItems
    selectEvent: React.Dispatch<React.SetStateAction<EventItems | undefined>>
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EventBox({ event,selectEvent,setOpen }: EventBoxProp) {

    const handleClickOpen = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        selectEvent(event);
        setOpen(true);
    }

    return (
        <div className="hover:cursor-pointer block h-full w-full bg-white border border-accent rounded-lg overflow-hidden" onClick={(e) => handleClickOpen(e)}>

            {/* <span className="bg-accent py-1">{`${startTime} - ${endTime}`}</span> */}
            <div className="flex flex-col gap-2 bg-accent/50 w-full h-full p-2">
                <header className="line-clamp-1 font-bold">{event.title}</header>
                <header className="line-clamp-1">{event.topic_name}</header>
                <p className="line-clamp-1">{event.progress.completed}/{event.progress.total} ข้อ</p>
            </div>

        </div>
    )
}