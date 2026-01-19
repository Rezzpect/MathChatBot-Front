
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import type { Event, View } from 'react-big-calendar';
import { useState, useMemo } from 'react';
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import { addDays, addWeeks, startOfWeek, endOfWeek } from 'date-fns';
import { getDay } from 'date-fns/getDay'
import { enUS } from 'date-fns/locale/en-US'
import { DayPicker } from 'react-day-picker';
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import './mycalendar.css'

const locales = { 'en-US': enUS, }

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export default function MyCalendar() {
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [currentView, setCurrentView] = useState<View>('week');
  const [date, setDate] = useState<Date>(new Date());

  const viewOptions: View[] = ['week', 'day']

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
      return `${format(start, 'd MMMM yyyy')} to ${format(end, 'd MMMM yyyy')}`
    }
  }, [date, currentView])

  return (
    <div>
      <div className='flex justify-between p-5'>
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
      <div>
        <Calendar
          localizer={localizer}
          events={myEvents}
          date={date}
          view={currentView}
          onNavigate={(newDate) => setDate(newDate)}
          style={{ height: '100vh' }}
          toolbar={false}
        />
      </div>
    </div>

  );
};