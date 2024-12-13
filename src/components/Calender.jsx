import React, { useState } from "react";
import { generateCalendarDays } from "./dates.js";
import CalendarHeader from "./CalenderHeader.jsx";
import FilterBar from './FilterBar.jsx'
import CalendarGrid from './CalenderGrid.jsx'
import EventList from './EvenList.jsx'
import EventModal from './EventModal.jsx'
import ExportSchedule from './ExportSchedule.jsx'


const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());  //Tracks the currently displayed month/year.
  const [events, setEvents] = useState([]);   //Array of event objects with details such as name, time, description, and date.
  const [selectedDate, setSelectedDate] = useState(null);  //Stores the date currently selected by the user
  const [showModal, setShowModal] = useState(false);  //Controls the visibility of the modal for adding/editing events.
  
  const [formData, setFormData] = useState({    //Holds input values for event name, time, and description.
    name: "",
    startTime: "",
    endTime: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);  //Tracks whether the user is editing an existing event
  const [editIndex, setEditIndex] = useState(null);   //Stores the index of the event being edited.
  const [filterDate, setFilterDate] = useState("");   //Stores the date input for filtering events.



  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = new Date();
  const calendarDays = generateCalendarDays(currentMonth, currentYear);

  const handlePrevMonth = () => {     //Navigate to the previous month
    const prevMonth = new Date(currentYear, currentMonth - 1, 1);
    setCurrentDate(prevMonth);
  };

  const handleNextMonth = () => {    //Navigate to the next month.
    const nextMonth = new Date(currentYear, currentMonth + 1, 1);
    setCurrentDate(nextMonth);
  };

  const goToToday = () => {    //Reset the calendar to the current date
    setCurrentDate(new Date());
  };

  const handleFilterSearch = () => {    //Filter events by a specific date
    if (filterDate) {
      const [year, month, day] = filterDate.split("-").map(Number);
      setCurrentDate(new Date(year, month - 1, day));
      setSelectedDate(filterDate);
    }
  };

  const openModal = (day) => {      //Open the modal to add or edit events for a selected date.
    if (day) {
      setSelectedDate(`${currentYear}-${currentMonth + 1}-${day}`);
      setShowModal(true);
    }
  };

  const handleAddOrEditEvent = () => {      //Add a new event or update an existing one.
    if (selectedDate && formData.name && formData.startTime && formData.endTime) {
      if (isEditing) {
        const updatedEvents = [...events];
        updatedEvents[editIndex] = { ...formData, date: selectedDate };
        setEvents(updatedEvents);
      } else {
        setEvents([...events, { date: selectedDate, ...formData }]);
      }
      setFormData({ name: "", startTime: "", endTime: "", description: "" });
      setShowModal(false);
      setIsEditing(false);
      setEditIndex(null);
    }
  };

  const handleDeleteEvent = (index) => {   //Delete an event based on its index.
    setEvents(events.filter((_, i) => i !== index));
  };

  const handleEditEvent = (index) => {   //Populate the modal with data for editing a selected event.
    const eventToEdit = events[index];
    setFormData({
      name: eventToEdit.name,
      startTime: eventToEdit.startTime,
      endTime: eventToEdit.endTime,
      description: eventToEdit.description,
    });
    setIsEditing(true);
    setEditIndex(index);
    setSelectedDate(eventToEdit.date);
    setShowModal(true);
  };

  const closeModal = () => {  // Close the modal and reset editing states.
    setShowModal(false);
    setIsEditing(false);
    setEditIndex(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 to-black p-4 flex flex-col sm:flex-row">
      {/* Div-1 */}
      <div className="max-w-3xl mx-1 sm:mx-0 sm:ml-[10rem] bg-gradient-to-r from-amber-100 to-emerald-100 rounded-2xl">
        <CalendarHeader     //Calendar header-Displays the month/year and navigation controls
          currentDate={currentDate}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
        />
        <CalendarGrid   //Renders the calendar days and events in a grid layout.
          calendarDays={calendarDays}
          today={today}
          currentDate={currentDate}
          events={events}
          selectedDate={selectedDate}
          filterDate={filterDate}
          openModal={openModal}
        />
        <FilterBar     //Provides a UI for filtering the calendar by date.
          filterDate={filterDate}
          setFilterDate={setFilterDate}
          handleFilterSearch={handleFilterSearch}
          goToToday={goToToday}
        />
      </div>

      <div className="sm:w-[30rem] mx-5">
      <EventList      //Displays a list of events with edit/delete controls.
        events={events}
        selectedDate={selectedDate}
        handleEditEvent={handleEditEvent}
        handleDeleteEvent={handleDeleteEvent}
      />
      </div>
      
      <ExportSchedule   //Exports the list of events for a specific date.
        events={events} 
        selectedDate={selectedDate} 
      />
      
      {showModal && (
        <EventModal   //Form for adding or editing events.
          isEditing={isEditing}
          formData={formData}
          setFormData={setFormData}
          handleAddOrEditEvent={handleAddOrEditEvent}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Calendar;