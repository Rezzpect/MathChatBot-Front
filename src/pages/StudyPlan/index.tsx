
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { type Event, type EventProps, type View } from 'react-big-calendar';
import { useState, useMemo, useEffect } from 'react';
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import { addDays, addWeeks, startOfWeek, endOfWeek, } from 'date-fns';
import { getDay } from 'date-fns/getDay'
import { enUS } from 'date-fns/locale/en-US'
import { DayPicker } from 'react-day-picker';
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import './mycalendar.css'
import EventModal from '../../modals/EventModal';
import EventBox from '../../components/EventBox';
import type { EventItems, EventResProp } from '../../@types/event';
import supabaseClient from '../../utils/SupabaseClient';

const locales = { 'en-US': enUS, }

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

export default function StudyPlan() {
    const [selectedEvent, setSelectedEvent] = useState<EventItems | undefined>(undefined);
    const [currentView, setCurrentView] = useState<View>('week');
    const [date, setDate] = useState<Date>(new Date());
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [eventList, setEventList] = useState<EventItems[]>([]);
    const [refresh, setRefresh] = useState<number>(0);

    const fetchEvent = async () => {
        const { data, error } = await supabaseClient.functions.invoke('student-study-plan-list');

        if (error) throw error
        if (data) {
            console.log(data.data);
            const res: EventResProp[] = data.data;
            const event_list: EventItems[] = res.map((item) => ({
                title: item.course_name,
                start: new Date(item.start_date),
                end: new Date(item.end_date),
                course_id: item.course_id,
                topic_id: item.topic_id,
                topic_name: item.topic_name,
                progress: { total: item.progress.total, completed: item.progress.completed }
            }))
            setEventList(event_list);
        }
    }

    useEffect(() => {
        fetchEvent();
    }, [refresh])

    const viewOptions: View[] = ['week', 'day']

    const components: any = {
        event: ({ event }: EventProps<EventItems>) => (<EventBox event={event} selectEvent={setSelectedEvent} setOpen={setIsOpen} />),
    }

    const handleReduceDate = () => {
        if (currentView === 'day') { setDate(addDays(date, -1)) }
        else if (currentView === 'week') { setDate(addWeeks(date, -1)) }
    }

    const handleIncreaseDate = () => {
        if (currentView === 'day') { setDate(addDays(date, 1)) }
        else if (currentView === 'week') { setDate(addWeeks(date, 1)) }
    }

    const handleGetToday = () => {
        setDate(new Date())
    }

    const dateText = useMemo(() => {
        if (currentView === 'day') return format(date, 'd MMMM yyyy');
        if (currentView === 'week') {
            const start = startOfWeek(date);
            const end = endOfWeek(date);
            return `${format(start, 'd MMMM yyyy')} - ${format(end, 'd MMMM yyyy')}`
        }
    }, [date, currentView])

    const STEP = 10
    const timeslots = 60 / 10

    return (
        <div>
            {isOpen && <EventModal modalData={selectedEvent} setOpen={setIsOpen} setRefresh={setRefresh} />}
            <div className='flex justify-between p-5 flex-col-reverse md:flex-row gap-5'>
                {/* change date */}
                <div className='flex gap-2 items-center'>
                    <div className='font-bold text-xl'>{dateText}</div>
                    <div>
                        <button popoverTarget="rdp-popover" className="bg-primary text-primary-content hover:cursor-pointer p-2 rounded-full" style={{ anchorName: "--rdp" } as React.CSSProperties}>
                            <FaCalendarAlt />
                        </button>
                        <div popover="auto" id="rdp-popover" className="dropdown shadow-sm" style={{ positionAnchor: "--rdp" } as React.CSSProperties}>
                            <DayPicker required className="react-day-picker" mode="single" selected={date} onSelect={setDate} />
                        </div>
                    </div>
                </div>

                <div className='flex items-center gap-5'>

                    <div className='flex items-center gap-2'>
                        <button className='hover:cursor-pointer' onClick={handleReduceDate}><IoIosArrowBack /></button>
                        <button className='btn bg-neutral' onClick={handleGetToday}>Today</button>
                        <button className='hover:cursor-pointer' onClick={handleIncreaseDate}><IoIosArrowForward /></button>
                    </div>
                    {/* button group */}
                    <div className='flex join'>
                        {viewOptions.map((label, id) => (
                            <button className={`btn join-item
              ${currentView === label ? 'bg-primary text-primary-content' : 'bg-base-200'}`}
                                id={`view_btn_${id}`}
                                onClick={() => setCurrentView(label)}>{label.toLocaleUpperCase()}</button>
                        ))}
                    </div>
                </div>
            </div>
            <div className='overflow-auto h-100%'>
                <Calendar
                    localizer={localizer}
                    events={eventList}
                    date={date}
                    components={components}
                    view={currentView}
                    onNavigate={(newDate) => setDate(newDate)}
                    step={STEP}
                    timeslots={timeslots}
                    dayLayoutAlgorithm={'no-overlap'}
                    toolbar={false}
                />
            </div>
        </div>

    );
};