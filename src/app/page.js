'use client'
import ToggleDarkMode from '../components/ToggleDarkMode';
import InsertPopup from '../components/event/Insert';
import UpdatePopup from '../components/event/update';
import DeletePopup from '../components/event/delete';
import React, { useEffect, useState } from 'react';

export default function Home () {
  /* Global state */
  const [darkMode, setDarkMode] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [calendarTitle, setcalendarTitle] = useState('');
  const [calendarDates, setCalendarDates] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [events, setEvents] = useState([]);

  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  /* End of global state */

  /* Dark mode script */
  const handleToggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };

  useEffect(() => {
    // Call the ToggleDarkMode function when the page loads
    const isDarkModeEnabled = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkModeEnabled);
  }, []);
  /* End of dark mode script */

  /* Date script */
  useEffect(() => {
    const currentDate = new Date();
    setCurrentDate(currentDate.toDateString());

    const options = { year: 'numeric', month: 'long' };
    const calendarTitle = currentDate.toLocaleDateString(undefined, options);
    setcalendarTitle(calendarTitle);
  }, []);

  useEffect(() => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const dates = [];
    let currentDay = new Date(firstDayOfMonth);

    // Move to the first Sunday of the displayed range
    currentDay.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());

    // Generate dates for each day in the displayed range (including previous and next month)
    while (currentDay <= lastDayOfMonth) {
      // Check if the date is in the current month
      if (currentDay.getMonth() === today.getMonth()) {
        dates.push(new Date(currentDay));
      } else {
        dates.push(null); // Add null for dates before the 1st day of the month
      }
      currentDay.setDate(currentDay.getDate() + 1);
    }

    setCalendarDates(dates);
  }, []);

  const isCurrentDate = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  /* End of date script */

  /* Reset all */
  const handleReset = () => {
    const darkModeValue = localStorage.getItem('darkMode');
    localStorage.clear();
    localStorage.setItem('darkMode', darkModeValue);
    window.location.reload();
  };
  /* End of reset all */

  /* Insert popup */
  const maxEventsPerDay = 3;

  const handleDateClick = (date) => {
    console.log('Insert popup opened');
    setSelectedDate(date);
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setSelectedDate(null);
    setPopupOpen(false);
  };

  const handleSaveEvent = (event) => {
    setEvents((prevEvents) => {
      const existingEvents = JSON.parse(localStorage.getItem('data')) || [];
      const updatedEvents = [...existingEvents, event];
      const uniqueCombinedEvents = Array.from(new Set(updatedEvents.map(JSON.stringify))).map(JSON.parse);

      localStorage.setItem('data', JSON.stringify(uniqueCombinedEvents));

      return uniqueCombinedEvents;
    });
  };


  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem('data', JSON.stringify(events));
    }
  }, [events]);
  /* End of insert popup */

  /* Update popup */
  const handleUpdateEvent = (event) => {
    console.log('Update popup opened');
    setSelectedEvent(event);
    setUpdatePopupOpen(true);
  };

  const handleUpdatePopupClose = () => {
    setSelectedEvent(null);
    setUpdatePopupOpen(false);
  };

  const handleUpdateSave = (updatedEvent) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.map((event) =>
        event === selectedEvent ? updatedEvent : event
      );

      localStorage.setItem('data', JSON.stringify(updatedEvents));

      return updatedEvents;
    });
  };
  /* End of update popup */

  /* Delete popup */
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  const handleDeleteEvent = (event) => {
    console.log('Delete popup opened');
    setSelectedEvent(event);
    setDeletePopupOpen(true);
  };

  const handleDeletePopupClose = () => {
    setSelectedEvent(null);
    setDeletePopupOpen(false);
  };

  const handleDeleteConfirm = () => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.filter((event) => event !== selectedEvent);

      localStorage.setItem('data', JSON.stringify(updatedEvents));

      return updatedEvents;
    });

    setDeletePopupOpen(false);
  };
  /* End of delete popup */

  /* Styling needs */
  function formatTimeIn12Hour (time) {
    const [hours, minutes] = time.split(':');
    const formattedHours = parseInt(hours, 10) % 12 || 12;
    const period = parseInt(hours, 10) >= 12 ? 'PM' : 'AM';
    return `${formattedHours}:${minutes} ${period}`;
  }

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const usedColors = {};
  /* End of styling needs */

  /* Get events from localStorage on page load */
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('data')) || [];
    setEvents(storedEvents);
  }, []);
  /* End of get events from localStorage */

  return (
    <main className={`${darkMode ? 'dark' : ''}`}>
      <div className='bg-white w-screen h-screen overflow-auto p-4 md:p-8 dark:bg-black lg:grid xl:justify-items-center lg:content-start'>
        <div className='flex flex-row flex-wrap flex-wrap justify-between lg:max-w-6xl'>
          <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 w-72 md:text-3xl md:w-96 lg:text-4xl lg:w-fit dark:text-white">Manage your event with <span className="text-light-primary">DSS Calendar</span> Online.</h1>
        </div>

        {/* Calendar */}
        <div className="my-10 lg:max-w-6xl">
          <div className="wrapper bg-light-primary rounded shadow w-full">
            <div className="header flex justify-between border-b p-2 dark:bg-light-primary">
              <button type="button" className="text-white hover:text-white border border-white hover:bg-red-600 hover:border-red-600 focus:outline-none focus:ring-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleReset}>Reset</button>
              <span className="text-3xl font-bold text-white my-auto">
                {calendarTitle}
              </span>
              <ToggleDarkMode darkMode={darkMode} toggleDarkMode={handleToggleDarkMode} />
            </div>
            <table className="w-full bg-white text-black dark:bg-black dark:text-white">
              <thead>
                <tr>
                  <th className="p-2 border h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                    <span className="xl:block lg:block md:block sm:block hidden">Sunday</span>
                    <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Sun</span>
                  </th>
                  <th className="p-2 border h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                    <span className="xl:block lg:block md:block sm:block hidden">Monday</span>
                    <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Mon</span>
                  </th>
                  <th className="p-2 border h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                    <span className="xl:block lg:block md:block sm:block hidden">Tuesday</span>
                    <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Tue</span>
                  </th>
                  <th className="p-2 border h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                    <span className="xl:block lg:block md:block sm:block hidden">Wednesday</span>
                    <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Wed</span>
                  </th>
                  <th className="p-2 border h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                    <span className="xl:block lg:block md:block sm:block hidden">Thursday</span>
                    <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Thu</span>
                  </th>
                  <th className="p-2 border h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                    <span className="xl:block lg:block md:block sm:block hidden">Friday</span>
                    <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Fri</span>
                  </th>
                  <th className="p-2 border h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                    <span className="xl:block lg:block md:block sm:block hidden">Saturday</span>
                    <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Sat</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {calendarDates.map((date, index) => (
                  index % 7 === 0 ? (
                    <tr className="text-center h-20" key={index}>
                      {calendarDates.slice(index, index + 7).map((day, i) => {
                        const eventsForDay = events
                          .filter(event => {
                            const eventDate = new Date(event.date);
                            const dayDate = day ? new Date(day) : null;

                            return day && eventDate.getDate() === dayDate.getDate() &&
                              eventDate.getMonth() === dayDate.getMonth() &&
                              eventDate.getFullYear() === dayDate.getFullYear();
                          })
                          .sort((a, b) => parseInt(a.time.replace(':', ''), 10) - parseInt(b.time.replace(':', ''), 10));

                        const isMaxEventsReached = eventsForDay.length >= maxEventsPerDay;

                        return (
                          <td
                            key={i}
                            className={`border p-1 h-fit xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 relative transition cursor-pointer duration-500 ease hover:bg-gray-300 hover:dark:bg-gray-600`}
                            onClick={() => !isMaxEventsReached && handleDateClick(day)}
                          >
                            {day ? (
                              <>
                                {isCurrentDate(day) && (
                                  <div className="absolute top-1 left-1 w-8 h-8 bg-red-500 rounded-full text-white flex items-center justify-center">
                                    {day.getDate()}
                                  </div>
                                )}
                                {!isCurrentDate(day) && <div className="absolute top-2 left-2">{day.getDate()}</div>}
                                {/* Show events for the day */}
                                {eventsForDay.length > 0 && (
                                  <div className="space-y-2 text-white p-1 mt-8 text-xs">
                                    {eventsForDay.map((event, index) => {
                                      const eventColor = usedColors[event.name] || getRandomColor();
                                      usedColors[event.name] = eventColor;

                                      return (
                                        <div key={index} className={`text-left p-1`} style={{ backgroundColor: eventColor }}>
                                          {event.name}
                                          <br />
                                          {event.invitees}
                                          <br />
                                          {formatTimeIn12Hour(event.time)}
                                          <div>
                                            {/* Update Button */}
                                            <button onClick={(e) => { e.stopPropagation(); handleUpdateEvent(event); }}><svg className="feather feather-edit" fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg></button>
                                            {/* Delete Button */}
                                            <button onClick={(e) => { e.stopPropagation(); handleDeleteEvent(event); }}><svg className="feather feather-trash-2" fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg></button>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </>
                            ) : ''}
                          </td>
                        );
                      })}
                    </tr>
                  ) : null
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Insert Popup */}
        {isPopupOpen && (
          <InsertPopup
            selectedDate={selectedDate}
            onClose={handlePopupClose}
            onSave={handleSaveEvent}
          />
        )}

        {/* Update popup */}
        {isUpdatePopupOpen && selectedEvent && (
          <UpdatePopup
            event={selectedEvent}
            onUpdate={handleUpdateSave}
            onClose={handleUpdatePopupClose}
          />
        )}

        {/* Delete Popup */}
        {isDeletePopupOpen && selectedEvent && (
          <DeletePopup
            event={selectedEvent}
            onDelete={handleDeleteConfirm}
            onClose={handleDeletePopupClose}
          />
        )}

        <div className='text-black text-sm text-right dark:text-white'>Made by <a target="_blank" href='https://linkedin.com/in/stephanie-b439a6204' rel="noopener noreferrer">Stephanie</a></div>
      </div>
    </main>
  );
}
