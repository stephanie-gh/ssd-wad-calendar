'use client'
import ToggleDarkMode from '../components/ToggleDarkMode';
import React, { useEffect, useState } from 'react';

export default function Home () {
  /* Global state */
  const [darkMode, setDarkMode] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [calendarTitle, setcalendarTitle] = useState('');
  const [calendarDates, setCalendarDates] = useState([]);
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

  return (
    <main className={`${darkMode ? 'dark' : ''}`}>
      <div className='bg-white dark:bg-black w-screen h-screen overflow-auto p-4 md:p-8'>
        <div className='flex flex-row flex-wrap flex-wrap justify-between'>
          <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 w-72 md:text-3xl md:w-96 lg:text-4xl lg:w-fit dark:text-white">Manage your event with <span className="text-light-primary">DSS Calendar</span> Online.</h1>
          <div className='grid content-center'>
            <ToggleDarkMode darkMode={darkMode} toggleDarkMode={handleToggleDarkMode} />
          </div>
        </div>

        {/* Calendar */}
        <div className="mt-10">
          <div className="wrapper bg-light-primary rounded shadow w-full">
            <div className="header flex justify-center border-b p-2 dark:bg-light-primary">
              <span className="text-3xl font-bold text-white">
                {calendarTitle}
              </span>
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
                      {calendarDates.slice(index, index + 7).map((day, i) => (
                        <td
                          key={i}
                          className={`border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 relative transition cursor-pointer duration-500 ease hover:bg-gray-300`}
                        >
                          {day ? (
                            <>
                              {isCurrentDate(day) && (
                                <div className="absolute top-1 left-1 w-8 h-8 bg-red-500 rounded-full text-white flex items-center justify-center">
                                  {day.getDate()}
                                </div>
                              )}
                              {!isCurrentDate(day) && <div className="absolute top-2 left-2">{day.getDate()}</div>}
                            </>
                          ) : ''}
                        </td>
                      ))}
                    </tr>
                  ) : null
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
