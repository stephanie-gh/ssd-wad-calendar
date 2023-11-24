import React, { useState } from 'react';

const Popup = ({ selectedDate, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [invitees, setInvitees] = useState('');

  const handleSave = () => {
    const event = {
      date: selectedDate,
      name,
      time,
      invitees,
    };

    onSave(event);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white text-black shadow-md shadow-gray-500 dark:shadow-gray-200 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">New Event</h2>
        <label className="block mb-2">
          Name
          <input
            type="text" value={name} onChange={(e) => setName(e.target.value)}
            className="mt-1 shadow appearance-none border rounded p-4 leading-tight focus:outline-none focus:shadow-outline dark:text-black w-full" />
        </label>
        <label className="block mb-2">
          Time (12 hour format)
          <input
            type="time" value={time} onChange={(e) => setTime(e.target.value)}
            className="mt-1 shadow appearance-none border rounded p-4 leading-tight focus:outline-none focus:shadow-outline dark:text-black w-full" />
        </label>
        <label className="block mb-4">
          Invitees by email
          <input
            type="email" value={invitees} onChange={(e) => setInvitees(e.target.value)}
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
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
