import React, { useState } from 'react';

const EventForm = ({ selectedDate, addEvent }) => {
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eventName || !startTime || !endTime) return;

    const newEvent = { eventName, startTime, endTime, description };
    addEvent(selectedDate, newEvent);

    setEventName('');
    setStartTime('');
    setEndTime('');
    setDescription('');
  };

  return (
    <div className="event-form">
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default EventForm;
