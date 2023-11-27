import React from 'react';

const DeleteEventPopup = ({ event, onDelete, onClose }) => {
  const handleDelete = () => {
    onDelete(event);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white text-black shadow-md shadow-gray-500 dark:shadow-gray-200 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Delete Event</h2>
        <label className="block mb-2">Are you sure to delete this event?</label>
        <div className="flex space-x-3 justify-end pt-3">
          <button
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-600 hover:text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="border border-red-600 text-red-600 px-4 py-2 rounded hover:bg-red-600 hover:text-white"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEventPopup;
