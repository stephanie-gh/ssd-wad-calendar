import React, { useState } from 'react';

const UpdateEventPopup = ({ event, onUpdate, onClose }) => {
  console.log('Update popup rendered!');
  const [eventName, setEventName] = useState(event.name);
  const [invitees, setInvitees] = useState(event.invitees);
  const [eventTime, setEventTime] = useState(event.time);

  const handleUpdate = () => {
    const updatedEvent = {
      ...event,
      name: eventName,
      invitees,
      time: eventTime,
    };

    onUpdate(updatedEvent);
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUpdate();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white text-black shadow-md shadow-gray-500 dark:shadow-gray-200 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Update Event</h2>
        <label className="block mb-2">
          Name
          <input
            type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} onKeyUp={handleKeyPress}
            className="mt-1 shadow appearance-none border rounded p-4 leading-tight focus:outline-none focus:shadow-outline dark:text-black w-full" />
        </label>
        <label className="block mb-2">
          Time (12 hour format)
          <input
            type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} onKeyUp={handleKeyPress}
            className="mt-1 shadow appearance-none border rounded p-4 leading-tight focus:outline-none focus:shadow-outline dark:text-black w-full" />
        </label>
        <label className="block mb-4">
          Invitees by email
          <input
            type="email" value={invitees} onChange={(e) => setInvitees(e.target.value)} onKeyUp={handleKeyPress}
            className="mt-1 shadow appearance-none border rounded p-4 leading-tight focus:outline-none focus:shadow-outline dark:text-black w-full" />
        </label>
        <div className="flex space-x-3 justify-end pt-3">
          <button
            className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-600 hover:text-white"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-600 hover:text-white"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateEventPopup;
