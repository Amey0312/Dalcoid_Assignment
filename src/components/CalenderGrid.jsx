import React from "react";


const CalendarGrid = ({
  calendarDays,
  today,
  currentDate,
  events,
  selectedDate,
  filterDate,
  openModal,
}) => {
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Weekdays in the new order: Monday to Sunday
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Generate calendar days with proper alignment
  const generateAlignedCalendarDays = () => {   //Calculates and aligns days in the grid with padding for empty slots
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const adjustedFirstDay = (firstDay + 6) % 7; // Adjust for Monday start

    const days = [];
    // Add padding for the beginning of the month
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(null);
    }
    // Add actual days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    // Add padding for the end of the month to complete the week
    while (days.length % 7 !== 0) {
      days.push(null);
    }

    return days;
  };

  const alignedCalendarDays = generateAlignedCalendarDays();

  // Parse the filter date for highlighting
  const filterDateObj = filterDate ? new Date(filterDate) : null;
  const filterDay =             //Determines if a filtered date is within the current month and year
    filterDateObj && 
    filterDateObj.getFullYear() === currentYear &&
    filterDateObj.getMonth() === currentMonth
      ? filterDateObj.getDate()
      : null;

  return (
    <div className="grid grid-cols-7 gap-2 p-4 font-bazerd text-[1rem] sm:text-xl">
      {weekdays.map((day) => (         //Grid with 7 columns
        <div key={day} className="text-center font-bold">
          {day}
        </div>
      ))}
      {alignedCalendarDays.map((day, index) => {
        const isToday =
          day &&
          today.getFullYear() === currentYear &&
          today.getMonth() === currentMonth &&
          today.getDate() === day;

        const isFilterDate = day === filterDay;

        return (
          <div
            key={index}
            className={`border shadow-green-200 rounded p-2 text-center cursor-pointer bg-white shadow-[5px_5px_0px_0px_rgba(163,230,53,1)] hover:shadow-[3px_3px_0px_0px_rgba(163,230,53,1)] transition-shadow  ${
              day
                ? "hover:bg-blue-100"
                : "bg-white" /* Ensure blank grids have white background */
            } ${
              day &&
              events.some(
                (event) =>
                  event.date === `${currentYear}-${currentMonth + 1}-${day}`
              )
                ? "underline"
                : ""
            } ${
              selectedDate === `${currentYear}-${currentMonth + 1}-${day}`
                ? "bg-blue-200"
                : ""
            } ${isToday ? "bg-yellow-200 font-bold" : ""} ${
              isFilterDate ? " font-bold text-3xl text-red-500 underline" : ""
            }`}
            onClick={() => day && openModal(day)}
          >
            {day || ""}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
