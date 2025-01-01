import React from 'react';
import { format, startOfMonth, endOfMonth, addMonths, subMonths, eachDayOfInterval, isToday } from 'date-fns';

const Calendar = ({ selectedDate, setSelectedDate, events, addEvent }) => {
  const startOfCurrentMonth = startOfMonth(selectedDate);
  const endOfCurrentMonth = endOfMonth(selectedDate);
  const daysInMonth = eachDayOfInterval({ start: startOfCurrentMonth, end: endOfCurrentMonth });

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  const handlePreviousMonth = () => {
    setSelectedDate(subMonths(selectedDate, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(addMonths(selectedDate, 1));
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePreviousMonth}>Previous</button>
        <span>{format(selectedDate, 'MMMM yyyy')}</span>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <div className="calendar-grid">
        {daysInMonth.map((date) => (
          <div
            key={date}
            className={`calendar-day ${isToday(date) ? 'today' : ''} ${events[format(date, 'yyyy-MM-dd')] ? 'has-events' : ''}`}
            onClick={() => handleDayClick(date)}
          >
            {format(date, 'd')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
