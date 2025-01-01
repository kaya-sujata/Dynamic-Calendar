import React, { useState } from 'react';
import { format } from 'date-fns';
import { Button, Input, Textarea } from '@shadcn/ui';

const EventList = ({ selectedDate, events, deleteEvent, updateEvent }) => {
  const dateStr = format(selectedDate, 'yyyy-MM-dd');
  const dayEvents = events[dateStr] || [];
  const [editEventIndex, setEditEventIndex] = useState(null);
  const [editEvent, setEditEvent] = useState({});
  const handleEdit = (index) => {
    setEditEventIndex(index);
    setEditEvent({ ...dayEvents[index] });
  };
  const handleUpdate = () => {
    updateEvent(selectedDate, editEventIndex, editEvent);
    setEditEventIndex(null);
    setEditEvent({});
  };

  const handleDelete = (index) => {
    deleteEvent(selectedDate, index);
  };

  return (
    <div className="event-list">
      <h2>Events for {format(selectedDate, 'MMMM dd, yyyy')}</h2>
      {dayEvents.length > 0 ? (
        <ul>
          {dayEvents.map((event, index) => (
            <li key={index} className="event-item">
              <h3>{event.eventName}</h3>
              <p>{event.startTime} - {event.endTime}</p>
              <p>{event.description}</p>
              <div className="event-buttons">
                <Button variant="danger" onClick={() => handleDelete(index)}>Delete</Button>
                <Button variant="primary" onClick={() => handleEdit(index)}>Edit</Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events for this day.</p>
      )}

{editEventIndex !== null && (
        <div className="edit-event">
          <h3>Edit Event</h3>
          <Input
            value={editEvent.eventName}
            onChange={(e) => setEditEvent({ ...editEvent, eventName: e.target.value })}
            placeholder="Event Name"
          />
          <Input
            type="time"
            value={editEvent.startTime}
            onChange={(e) => setEditEvent({ ...editEvent, startTime: e.target.value })}
          />
          <Input
            type="time"
            value={editEvent.endTime}
            onChange={(e) => setEditEvent({ ...editEvent, endTime: e.target.value })}
          />
          <Textarea
            value={editEvent.description}
            onChange={(e) => setEditEvent({ ...editEvent, description: e.target.value })}
            placeholder="Event Description"
          />
          <Button variant="primary" onClick={handleUpdate}>Update Event</Button>
        </div>
      )}
    </div>
  );
};

