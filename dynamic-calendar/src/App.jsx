import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import EventList from './EventList';
import EventForm from './EventForm';
import "./style.css"
import { format } from 'date-fns';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem('events');
    return storedEvents ? JSON.parse(storedEvents) : {};
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (date, event) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const newEvents = { ...events };

    if (!newEvents[dateStr]) {
      newEvents[dateStr] = [];
    }

    newEvents[dateStr].push(event);
    setEvents(newEvents);
  };
  const deleteEvent = (date, index) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const newEvents = { ...events };

    if (newEvents[dateStr] && newEvents[dateStr].length > 0) {
      newEvents[dateStr].splice(index, 1);
    }

    if (newEvents[dateStr].length === 0) {
      delete newEvents[dateStr];
    }

    setEvents(newEvents); 
  };
  
 
  const updateEvent = (date, index, updatedEvent) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const newEvents = { ...events };

    if (newEvents[dateStr] && newEvents[dateStr][index]) {
      newEvents[dateStr][index] = updatedEvent;
    }

    setEvents(newEvents);
  };
  return (
    <div className="app">
      <h1>Dynamic Event Calendar</h1>
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} events={events} addEvent={addEvent} />
      <EventList selectedDate={selectedDate} events={events} deleteEvent={deleteEvent} updateEvent={updateEvent} />
      <EventForm selectedDate={selectedDate} addEvent={addEvent} />
    </div>
  );
};

export default App;
